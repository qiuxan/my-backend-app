# Node 22 + TypeScript + Docker Backend

## Project Structure
```
my-backend-app/
├── backend/          # Node.js TypeScript backend
│   ├── src/         # Source code
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
# start dev container (bind mounts + live reload)
docker compose -f docker-compose.dev.yml up --build
```

### Local Node.js Development
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

## API Endpoints
- `GET /` - Hello message
- `GET /health` - Health check endpoint