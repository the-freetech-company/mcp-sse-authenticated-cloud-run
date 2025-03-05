import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Create and configure Express server
export const createServer = (mcpServer: McpServer) => {
  const app = express();
  const port = process.env.PORT || 3030;
  let transport: SSEServerTransport;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check endpoint - no auth required
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Apply API key authentication to MCP endpoints
  // app.use(["/sse", "/messages"]);

  // SSE endpoint for MCP
  app.get("/sse", async (req, res) => {
    console.log("SSE endpoint hit");
    transport = new SSEServerTransport("/messages", res);
    await mcpServer.connect(transport);
  });

  // Message endpoint for MCP
  app.post("/messages", async (req, res) => {
    if (!transport) {
      res.status(500).send("No transport found");
      return;
    }
    await transport.handlePostMessage(req, res, req.body);
  });

  // Start the server
  const startServer = () => {
    return new Promise<void>((resolve) => {
      app.listen(port, () => {
        console.log(`MCP Server is running on port ${port}`);
        resolve();
      });
    });
  };

  return {
    app,
    startServer,
  };
};
