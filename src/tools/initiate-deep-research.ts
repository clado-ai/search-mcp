import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const initiateDeepResearchName = "initiate_deep_research";

export const initiateDeepResearchDescription = "Initiate a deep research job that combines multiple search variations with optional email enrichment. Each result costs 1 credit.";

export const initiateDeepResearchSchema = {
  query: z.string().describe("The search query to research"),
  limit: z.number().max(100).default(30).describe("Maximum number of results to return (default: 30, max: 100)"),
  email: z.string().optional().describe("An email address to notify when the job is complete"),
};

type InitiateDeepResearchParams = {
  query: string;
  limit?: number;
  email?: string;
};

export const initiateDeepResearchTool = async ({
  query,
  limit = 30,
  email,
}: InitiateDeepResearchParams) => {
  const apiUrl = new URL("https://search.clado.ai/api/search/deep_research");
  const body = {
    query,
    limit: Math.min(limit, 100),
    ...(email && { email }),
  };

  const response = await makeCladoRequest(apiUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to initiate deep research: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `deep research job initiated: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
