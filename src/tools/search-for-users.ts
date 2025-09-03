import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const searchForUsersName = "search_for_users";

export const searchForUsersDescription = "Search for users on Clado using filters like query, school, and match threshold.";

export const searchForUsersSchema = {
  query: z.string().describe("Natural language search query to find LinkedIn profiles"),
  limit: z.number().min(1).max(100).default(30).describe("Maximum number of profiles to return (1–100)"),
  schools: z.array(z.string()).optional().describe("List of school names to filter results by, e.g., ['Stanford', 'MIT']"),
  companies: z.array(z.string()).optional().describe("List of company names to filter results by"),
  advanced_filtering: z
    .boolean()
    .default(true)
    .describe("Enable AI agent-based filtering to improve result quality"),
  search_id: z.string().uuid().optional().describe("ID from previous search for pagination"),
  offset: z.number().min(0).default(0).optional().describe("Number of results to skip for pagination"),
};

type SearchForUsersParams = {
  query: string;
  limit?: number;
  schools?: string[];
  companies?: string[];
  advanced_filtering?: boolean;
  search_id?: string;
  offset?: number;
};

export const searchForUsersTool = async ({
  query,
  limit = 30,
  schools,
  companies,
  advanced_filtering = true,
  search_id,
  offset = 0,
}: SearchForUsersParams) => {

  const url = new URL("https://search.clado.ai/api/search");
  url.searchParams.append("query", query);
  url.searchParams.append("limit", String(Math.min(limit, 100)));
  url.searchParams.append("advanced_filtering", String(advanced_filtering));
  
  if (offset > 0) {
    url.searchParams.append("offset", String(offset));
  }
  
  if (search_id) {
    url.searchParams.append("search_id", search_id);
  }

  if (schools && schools.length > 0) {
    schools.forEach((s: string) => url.searchParams.append("schools", s));
  }
  
  if (companies && companies.length > 0) {
    companies.forEach((c: string) => url.searchParams.append("companies", c));
  }

  const response = await makeCladoRequest(url.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to search for users: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `Search completed successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
