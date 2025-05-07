# Tech Stack
- Node.js + Express (REST API) + TypeScript
- Prisma (ORM)
- PostgreSQL (via Docker)
- ts-node-dev (for auto-reloading in development)

# Prerequisites
Make sure the following are installed on your machine:
- Node.js ≥ 18.18.0
- npm
- Docker Desktop

# 🚀 Getting Started

1. Install dependencies

npm install

2. Start the database, sync Prisma schema, and run the server

npm run dev

This script will:
- Start PostgreSQL using Docker
- Sync the Prisma schema to the database (db push)
- Start the Express server using ts-node-dev

# To start Prisma Studio (UI for the database Prisma-postgreSQL)
npx prisma studio 