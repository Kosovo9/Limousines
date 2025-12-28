render-build:
  # Instalar dependencias backend
  - cd backend && npm install
frontend-build:
  # Instalar dependencias frontend
  - cd frontend/app && npm install && npm run build
