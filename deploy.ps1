# 🚀 DEPLOYMENT AUTOMATION SCRIPT
# Run this script to deploy Limousines to Render + Netlify

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🚀 LIMOUSINES DEPLOYMENT SCRIPT" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Verify we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in Limousines root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Directory verified`n" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Root dependencies failed" -ForegroundColor Red
    exit 1
}

Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend dependencies failed" -ForegroundColor Red
    exit 1
}
Set-Location ..

Set-Location frontend/app
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend app dependencies failed" -ForegroundColor Red
    exit 1
}
Set-Location ../..

Set-Location frontend/landing
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend landing dependencies failed" -ForegroundColor Red
    exit 1
}
Set-Location ../..

Write-Host "✅ All dependencies installed`n" -ForegroundColor Green

# Step 3: Build frontend to verify
Write-Host "🏗️  Building frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful`n" -ForegroundColor Green

# Step 4: Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm test --if-present
Write-Host "✅ Tests completed`n" -ForegroundColor Green

# Step 5: Commit and push changes
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "feat: Complete i18n implementation and deployment config" -m "- Added complete en/es translations" -m "- Updated i18n hook to load JSON files" -m "- Added LanguageSelector component" -m "- Created deployment environment configs" -m "- Ready for Render + Netlify deployment"
git push origin main

Write-Host "✅ Changes pushed to GitHub`n" -ForegroundColor Green

# Step 6: Display next steps
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ PRE-DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📋 NEXT STEPS (Manual):`n" -ForegroundColor Yellow

Write-Host "1️⃣  BACKEND (Render.com):" -ForegroundColor Cyan
Write-Host "   → Go to: https://dashboard.render.com" -ForegroundColor White
Write-Host "   → Create new Web Service" -ForegroundColor White
Write-Host "   → Connect GitHub: Kosovo9/Limousines" -ForegroundColor White
Write-Host "   → Root Directory: backend" -ForegroundColor White
Write-Host "   → Build Command: npm install" -ForegroundColor White
Write-Host "   → Start Command: npm start" -ForegroundColor White
Write-Host "   → Copy env vars from: RENDER_ENV_VARS.txt`n" -ForegroundColor White

Write-Host "2️⃣  FRONTEND APP (Netlify):" -ForegroundColor Cyan
Write-Host "   → Go to: https://app.netlify.com" -ForegroundColor White
Write-Host "   → Import from GitHub: Kosovo9/Limousines" -ForegroundColor White
Write-Host "   → Base directory: frontend/app" -ForegroundColor White
Write-Host "   → Build command: npm install && npm run build" -ForegroundColor White
Write-Host "   → Publish directory: frontend/app/dist" -ForegroundColor White
Write-Host "   → Add env vars from: frontend/app/.env.production`n" -ForegroundColor White

Write-Host "3️⃣  FRONTEND LANDING (Netlify):" -ForegroundColor Cyan
Write-Host "   → Create another Netlify site" -ForegroundColor White
Write-Host "   → Base directory: frontend/landing" -ForegroundColor White
Write-Host "   → Build command: npm install && npm run build" -ForegroundColor White
Write-Host "   → Publish directory: frontend/landing/dist`n" -ForegroundColor White

Write-Host "4️⃣  UPDATE URLs:" -ForegroundColor Cyan
Write-Host "   → After deployment, update:" -ForegroundColor White
Write-Host "     - VITE_API in Netlify (frontend app)" -ForegroundColor White
Write-Host "     - FRONTEND_URL in Render (backend)" -ForegroundColor White
Write-Host "     - Redeploy both services`n" -ForegroundColor White

Write-Host "📚 Full instructions: DEPLOYMENT_CHECKLIST.md`n" -ForegroundColor Yellow

Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "💡 TIP: Open browser now? (Y/N): " -ForegroundColor Yellow -NoNewline
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Start-Process "https://dashboard.render.com"
    Start-Process "https://app.netlify.com"
    Write-Host "`n✅ Browsers opened! Follow the steps above.`n" -ForegroundColor Green
}

Write-Host "🚀 Ready to deploy! Good luck!`n" -ForegroundColor Green
