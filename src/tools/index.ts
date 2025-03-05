import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { weatherTools } from "./weather";

export const registerTools = (server: McpServer) => {
  weatherTools(server);
};
