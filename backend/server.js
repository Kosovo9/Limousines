import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "node:path";
import sharp from "sharp";
import cluster from "node:cluster";
import os from "node:os";
import authRoutes from "./routes/auth.js";
import limoRoutes from "./routes/limousines.js";
import bookingRoutes from "./routes/bookings.js";
import { authMiddleware } from "./middlewares/auth.js";
import analyticsRoutes from "./routes/analytics.js";
import reviewRoutes from "./routes/reviews.js";
import paymentRoutes from "./routes/payments.js";
import unitRoutes from "./routes/units.js";
import aiRoutes from "./routes/ai.js";
import i18nRoutes from "./routes/i18n.js";
import { train as trainAI } from "./ai/train.js";

import cors from "cors"; // Ensure this is installed
import { createServer } from "http"; // For graceful shutdown

const app = express();

// ⚡ BESTIA MODE: Multi-Core Processing
const numCPUs = os.cpus().length;
if (cluster.isPrimary && process.env.NODE_ENV === "production") {
  console.log(`🚀 Primary ${process.pid} spawning ${numCPUs} workers`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, spawning replacement`);
    cluster.fork();
  });
} else {
  // ⚡ BESTIA Redis: Multi-layer Caching with Connection Pool
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 100, 5000),
      connectTimeout: 10000,
      lazyConnect: true,
      keepAlive: 30000,
    },
    database: 0,
    maxCommandSize: 1024 * 1024, // 1MB
    commandTimeout: 5000,
  });

  // Redis Connection Pool & Health Check
  redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
  redisClient.on("connect", () => console.log("✅ Redis Connected"));
  redisClient.on("ready", () => console.log("⚡ Redis Ready - BESTIA MODE"));
  redisClient.on("end", () => console.log("⚠️ Redis Disconnected"));

  await redisClient.connect().catch(console.error);

  // ⚡ BESTIA Security: Advanced CORS & Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'", process.env.FRONTEND_URL],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(
    cors({
      origin: [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
        "https://limousines-app.netlify.app",
        /\.netlify\.app$/,
        /\.vercel\.app$/,
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      optionsSuccessStatus: 200,
    }),
  );

  // ⚡ BESTIA Compression: Brotli + Gzip with Smart Caching
  app.use(
    compression({
      level: 9,
      threshold: 1024,
      brotli: {
        quality: 11,
        params: {
          [require("zlib").constants.BROTLI_PARAM_MODE]:
            require("zlib").constants.BROTLI_MODE_TEXT,
        },
      },
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) return false;
        return compression.filter(req, res);
      },
    }),
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // ⚡ BESTIA Rate Limiting: Multi-tier Protection
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased for high performance
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later" },
    skip: (req) => req.ip === "127.0.0.1" || req.ip === "::1",
  });

  const strictLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30,
    message: { error: "Rate limit exceeded for sensitive operations" },
  });

  app.use("/api/", apiLimiter);
  app.use("/api/auth/", strictLimiter);
  app.use("/api/payments/", strictLimiter);

  // ⚡ BESTIA Image Processing: Multi-format with Aggressive Caching
  app.get("/img/:name", async (req, res, next) => {
    const { name } = req.params;
    const { w = 1280, h = 720, q = 75, f = "auto" } = req.query;
    const key = `img:${name}:${w}x${h}:q${q}:${f}`;

    try {
      // L1 Cache: Redis
      if (redisClient.isOpen) {
        const cached = await redisClient.getBuffer(key);
        if (cached) {
          res.set("Cache-Control", "public, max-age=31536000, immutable");
          res.set("X-Cache", "HIT-Redis");
          return res.type(f === "auto" ? "avif" : f).send(cached);
        }
      }

      const file = path.resolve("public", name.replace(/\..+/, ".jpg"));
      const width = Math.min(parseInt(w), 2560);
      const height = Math.min(parseInt(h), 1440);
      const quality = Math.min(Math.max(parseInt(q), 10), 95);

      // Smart format detection
      const acceptsWebP = req.headers.accept?.includes("image/webp");
      const acceptsAVIF = req.headers.accept?.includes("image/avif");
      const format =
        f === "auto"
          ? acceptsAVIF
            ? "avif"
            : acceptsWebP
              ? "webp"
              : "jpeg"
          : f;

      let processedImage;
      const sharpInstance = sharp(file).resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      });

      switch (format) {
        case "avif":
          processedImage = await sharpInstance
            .avif({ quality, effort: 4, chromaSubsampling: "4:2:0" })
            .toBuffer();
          break;
        case "webp":
          processedImage = await sharpInstance
            .webp({ quality, effort: 4 })
            .toBuffer();
          break;
        default:
          processedImage = await sharpInstance
            .jpeg({ quality, mozjpeg: true })
            .toBuffer();
      }

      // Cache for 1 hour with Redis
      if (redisClient.isOpen) {
        await redisClient.setEx(key, 3600, processedImage);
      }

      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.set("X-Cache", "MISS");
      res.type(format).send(processedImage);
    } catch (e) {
      next();
    }
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/limousines", limoRoutes);
  app.use("/api/bookings", authMiddleware, bookingRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/units", unitRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/i18n", i18nRoutes);

  // Train AI on boot
  trainAI().catch(console.error);

  // SSR shell for Antigravity
  app.get("/shell", (_req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
  });

  // ⚡ BESTIA Database: Optimized MongoDB Connection Pool
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50, // Maximum number of connections
      minPoolSize: 5, // Minimum number of connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      family: 4, // Use IPv4, skip trying IPv6
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      compressors: "zstd,zlib,snappy", // Enable compression
    });
    console.log("✅ MongoDB Connected - BESTIA MODE with Connection Pool");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }

  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 BESTIA API ready on port ${process.env.PORT || 5000}`);
    console.log(`⚡ Worker ${process.pid} active`);
    console.log(
      `🔥 Performance mode: ${process.env.NODE_ENV || "development"}`,
    );
  });

  // ⚡ BESTIA Server Configuration
  server.keepAliveTimeout = 65000; // Slightly higher than ALB idle timeout
  server.headersTimeout = 66000; // Slightly higher than keepAliveTimeout
  server.maxHeadersCount = 50;
  server.timeout = 120000; // 2 minutes

  // Health Check Endpoint
  app.get("/health", async (req, res) => {
    const health = {
      uptime: process.uptime(),
      timestamp: Date.now(),
      status: "OK",
      worker: process.pid,
      memory: process.memoryUsage(),
      redis: redisClient.isOpen ? "connected" : "disconnected",
      mongodb:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    };
    res.status(200).json(health);
  });

  // Graceful Shutdown - BESTIA Style
  const gracefulShutdown = (signal) => {
    console.log(`${signal} received: starting graceful shutdown`);
    server.close(async () => {
      console.log("✅ HTTP server closed");
      try {
        await mongoose.connection.close();
        console.log("✅ MongoDB connection closed");
        await redisClient.quit();
        console.log("✅ Redis connection closed");
        console.log("✅ Graceful shutdown completed");
        process.exit(0);
      } catch (err) {
        console.error("❌ Error during shutdown:", err);
        process.exit(1);
      }
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      console.error("⚠️ Forced shutdown after 30s timeout");
      process.exit(1);
    }, 30000);
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGHUP", () => gracefulShutdown("SIGHUP"));

  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    gracefulShutdown("UNCAUGHT_EXCEPTION");
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    gracefulShutdown("UNHANDLED_REJECTION");
  });
} // End of cluster worker block
