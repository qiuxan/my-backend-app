# Node 22 + TypeScript + Docker (scaffold)


## Requirements
- Docker & Docker Compose installed
- (Optional) Node.js & npm locally if you want to run without Docker


## Local dev with Docker Compose


```bash
# start dev container (bind mounts + live reload)
docker compose -f docker-compose.dev.yml up --build