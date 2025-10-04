# Node 22 + TypeScript + Docker Backend

## Project Structure
```
my-backend-app/
├── backend/          # Node.js TypeScript backend
│   ├── src/         # Source code
│   ├── config/      # Environment configuration files
│   ├── scripts/     # Build and utility scripts
│   ├── tests/       # Test files
│   ├── package.json # Dependencies and scripts
│   └── tsconfig.json # TypeScript configuration
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile       # Production Docker image
└── README.md        # This file
```

## Requirements
- Docker & Docker Compose installed
- (Optional) Node.js & npm locally if you want to run without Docker

## Local Development

### With Docker Compose (Recommended)
```bash
# Start dev container with hot reload (nodemon + ts-node)
docker compose -f docker-compose.dev.yml up --build
```
The development server will be available at `http://localhost:3000`

### Local Node.js Development
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Or start with hot reload
npm run dev:hot
```

## Production Deployment

### Build Production Docker Image
```bash
# Build production image
docker build -t my-backend-app .

# Run production container
# Note: Production environment uses port 8081
docker run -p 3000:8081 my-backend-app
```

## Available Scripts
- `npm run dev` - Start development server with ts-node
- `npm run dev:hot` - Start development server with hot reload (nodemon)
- `npm run build` - Build for production (with linting)
- `npm run build:prod` - Build for production (skip linting, for Docker)
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm start` - Start production server

## Environment Configuration
The application uses different environment files:
- `config/.env.development` - Development settings (PORT=3000)
- `config/.env.production` - Production settings (PORT=8081)
- `config/.env.test` - Test settings

## API Endpoints
- `GET /` - Hello message
- `GET /api/users` - User management endpoints
- Additional routes defined in `src/routes/`