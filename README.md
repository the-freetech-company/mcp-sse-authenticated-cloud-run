# FreeTech Kanban MCP Server

This is a Model Context Protocol (MCP) server for interacting with the FreeTech Kanban board system through Cursor.

## Overview

The MCP server provides a set of tools that allow AI assistants to interact with the FreeTech Kanban boards stored in Firestore. It enables querying boards, lists, and cards, as well as searching for specific cards.

## Directory Structure

```
services/mcp-server/
├── src/
│   ├── api/           # Express server setup
│   ├── models/        # Type definitions
│   ├── scripts/       # CLI scripts
│   ├── services/      # Firebase/Firestore services
│   ├── tools/         # MCP tools implementation
│   ├── utils/         # Utility functions
│   └── index.ts       # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Available Tools

The MCP server provides the following tools:

- `get-all-boards`: Get a list of all available kanban boards
- `get-board`: Get details of a specific board by ID
- `get-board-lists`: Get all lists for a specific board
- `get-list-cards`: Get all cards in a specific list
- `get-card`: Get details for a specific card
- `search-cards`: Search for cards by title or description

## Authentication

The MCP server uses API key authentication. API keys are stored in the Firestore `apiKeys` collection and must be provided as a query parameter:

```
http://localhost:3030/sse?apiKey=your_api_key
```

### API Key Structure

Each API key document in Firestore contains:

- `key`: The API key string
- `userId`: (Optional) The Firebase user ID associated with this key
- `scopes`: Array of permission scopes (e.g., ['read', 'write'])
- `description`: (Optional) Description of the key's purpose
- `createdAt`: Timestamp when the key was created
- `expiresAt`: (Optional) Timestamp when the key expires

### Generating API Keys

You can generate API keys using the provided CLI script:

```bash
# Format: npx ts-node src/scripts/createApiKey.ts [userId] [scope1,scope2,...] [description] [expiresInDays]

# Example: Generate a key with read scope that never expires
npx ts-node src/scripts/createApiKey.ts

# Example: Generate a key for a specific user with read and write scopes
npx ts-node src/scripts/createApiKey.ts user123 read,write "Development key" 30
```

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Firebase project with Firestore

### Setup

1. Install dependencies:

   ```
   pnpm install
   ```

2. Create a `.env` file with your Firebase configuration (if needed)

3. Run the development server:
   ```
   pnpm dev
   ```

### Building

```
pnpm build
```

### Running in Production

```
pnpm start
```

## Docker

A Dockerfile is provided for containerization:

```
docker build -t freelo-mcp-server .
docker run -p 3030:3030 freelo-mcp-server
```

## API Endpoints

- `GET /health`: Health check endpoint (no authentication required)
- `GET /sse`: SSE endpoint for MCP (requires API key)
- `POST /messages`: Message endpoint for MCP (requires API key)

## Integration with Cursor

This MCP server can be used with Cursor to enable AI assistants to interact with your kanban boards. Configure Cursor to connect to this server at `http://localhost:3030/sse?apiKey=your_api_key` (or your deployed URL).

<!-- IMPORTANT DO NOT REMOVE - YOU CANNOT USE - (dashes) IN TOOL NAMES OR CURSOR WILL NOT UNDERSTAND IT, YOU MUST USE UNDERSCORES INSTEAD OF DASHES -->
