import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                premium: {
                    gold: "#D4AF37",
                    black: "#0A0A0A",
                    silver: "#C0C0C0",
                },
            },
        },
    },
    plugins: [],
};
export default config;
