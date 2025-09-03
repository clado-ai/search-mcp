import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchForUsersName, searchForUsersDescription, searchForUsersSchema, searchForUsersTool } from "./tools/search-for-users";
import { enrichLinkedinName, enrichLinkedinDescription, enrichLinkedinSchema, enrichLinkedinTool } from "./tools/enrich-linkedin";
import { retrieveContactsName, retrieveContactsDescription, retrieveContactsSchema, retrieveContactsTool } from "./tools/retrieve-contacts";
import { scrapeLinkedinName, scrapeLinkedinDescription, scrapeLinkedinSchema, scrapeLinkedinTool } from "./tools/scrape-linkedin";
import { linkedinPostReactionsName, linkedinPostReactionsDescription, linkedinPostReactionsSchema, linkedinPostReactionsTool } from "./tools/linkedin-post-reactions";

function setupServer(server: McpServer) {
  // Register all tools
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
}

export default setupServer;
