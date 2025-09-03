import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const enrichLinkedinName = "enrich_linkedin";

export const enrichLinkedinDescription = "Retrieves detailed profile information for a specific LinkedIn URL. Each successful lookup costs 1 credit.";

export const enrichLinkedinSchema = {
  linkedin_url: z.string().describe("The LinkedIn profile URL to look up."),
};

type EnrichLinkedinParams = {
  linkedin_url: string;
};

export const enrichLinkedinTool = async ({
  linkedin_url,
}: EnrichLinkedinParams) => {
  const apiUrl = new URL("https://search.clado.ai/api/enrich/linkedin");
  apiUrl.searchParams.append("linkedin_url", linkedin_url);

  const response = await makeCladoRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to enrich LinkedIn profile: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `enrichment completed successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
