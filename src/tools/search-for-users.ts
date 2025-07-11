import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const searchForUsersName = "search_for_users";

export const searchForUsersDescription = "Search for users on Clado using filters like query, school, and match threshold.";

export const searchForUsersSchema = {
  query: z.string().describe("Natural language search query"),
  limit: z.number().min(1).max(100).default(10).describe("Maximum number of results to return (1–100)"),
  school: z.array(z.string()).optional().describe("Filter by school name(s), e.g., ['Stanford', 'MIT']"),
  company: z.array(z.string()).optional().describe("Filter by company names (current or past employers)"),
  acceptance_threshold: z
    .number()
    .min(0)
    .max(100)
    .default(73)
    .describe("Minimum match score threshold (0-100). Defaults to 73."),
};

type SearchForUsersParams = {
  query: string;
  limit?: number;
  school?: string[];
  company?: string[];
  acceptance_threshold?: number;
};

export const searchForUsersTool = async ({
  query,
  limit = 10,
  school,
  company,
  acceptance_threshold = 73,
}: SearchForUsersParams) => {

  const url = new URL("https://search.clado.ai/api/search/users");
  url.searchParams.append("query", query);
  url.searchParams.append("limit", String(Math.min(limit, 100)));
  url.searchParams.append("acceptance_threshold", String(Math.max(0, Math.min(100, acceptance_threshold))));

  if (school && school.length > 0) {
    school.forEach((s: string) => url.searchParams.append("school", s));
  }
  
  if (company && company.length > 0) {
    company.forEach((c: string) => url.searchParams.append("company", c));
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
