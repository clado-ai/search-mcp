import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const linkedinPostReactionsName = "linkedin_post_reactions";

export const linkedinPostReactionsDescription = "Retrieves reactions and engagement data for a specific LinkedIn post URL.";

export const linkedinPostReactionsSchema = {
  post_url: z.string().describe("The LinkedIn post URL to analyze for reactions."),
};

type LinkedinPostReactionsParams = {
  post_url: string;
};

export const linkedinPostReactionsTool = async ({
  post_url,
}: LinkedinPostReactionsParams) => {
  const apiUrl = new URL("https://search.clado.ai/api/enrich/post-reactions");
  apiUrl.searchParams.append("url", post_url);

  const response = await makeCladoRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to get LinkedIn post reactions: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `LinkedIn post reactions retrieved successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
}; 