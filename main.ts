import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "Check email MCP Server",
    version: "1.0.0",
    description: "Checks if an email address is valid and returns user information"
});

server.tool("check-email", "Checks if an email address is valid and returns user information",
    {
        email: z.string().email().describe("email address of the user to check"),
    },
    async ({ email }) => {

        const response = await fetch(`https://api.usercheck.com/email/${email}`);
        const data = await response.json();
        console.log(data);
        return {
            content: [
                {
                    type: "text",
                    text: `User information for ${email}: ${JSON.stringify(data)}`
                }
            ]
        }
    });

const tranport = new StdioServerTransport();
await server.connect(tranport);