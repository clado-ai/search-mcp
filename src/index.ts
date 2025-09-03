import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { z } from "zod";
import { searchForUsersName, searchForUsersDescription, searchForUsersSchema, searchForUsersTool } from "./tools/search-for-users.js";
import { enrichLinkedinName, enrichLinkedinDescription, enrichLinkedinSchema, enrichLinkedinTool } from "./tools/enrich-linkedin.js";
import { retrieveContactsName, retrieveContactsDescription, retrieveContactsSchema, retrieveContactsTool } from "./tools/retrieve-contacts.js";
import { scrapeLinkedinName, scrapeLinkedinDescription, scrapeLinkedinSchema, scrapeLinkedinTool } from "./tools/scrape-linkedin.js";
import { linkedinPostReactionsName, linkedinPostReactionsDescription, linkedinPostReactionsSchema, linkedinPostReactionsTool } from "./tools/linkedin-post-reactions.js";

export const configSchema = z.object({
  cladoApiKey: z.string().describe("Clado API key for authentication"),
});

export default function createServer({ config }: { config?: z.infer<typeof configSchema> }): Server {
  if (config?.cladoApiKey) {
    process.env.CLADO_API_KEY = config.cladoApiKey;
  }

  const server = new McpServer({
    name: "clado",
    version: "1.0.33",
  });

  server.tool(
    searchForUsersName,
    searchForUsersDescription,
    searchForUsersSchema,
    searchForUsersTool
  );

  server.tool(
    enrichLinkedinName,
    enrichLinkedinDescription,
    enrichLinkedinSchema,
    enrichLinkedinTool
  );

  server.tool(
    retrieveContactsName,
    retrieveContactsDescription,
    retrieveContactsSchema,
    retrieveContactsTool
  );

  server.tool(
    scrapeLinkedinName,
    scrapeLinkedinDescription,
    scrapeLinkedinSchema,
    scrapeLinkedinTool
  );

  server.tool(
    linkedinPostReactionsName,
    linkedinPostReactionsDescription,
    linkedinPostReactionsSchema,
    linkedinPostReactionsTool
  );

  return server.server;
}