import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import dotenv from "dotenv";
import { createServer } from "./utils/createServer";
import { initFirebaseAdmin } from "./utils/initFirebaseAdmin";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
initFirebaseAdmin();
import { registerTools } from "./tools";

// Create MCP server instance
const server = new McpServer({
  name: "weather-mcp",
  version: "1.0.0",
});

// Register tools

// Start the server
async function main() {
  try {
    const { startServer } = createServer(server);
    registerTools(server);
    await startServer();
    console.log("MCP Server initialized successfully");
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});

// Start the application
main();
