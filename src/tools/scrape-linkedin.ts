import { z } from "zod";
import { makeCladoRequest } from "../utils.js";

export const scrapeLinkedinName = "scrape_linkedin";

export const scrapeLinkedinDescription = "Retrieves detailed profile data and posts with comments from a LinkedIn profile URL using RapidAPI. Each request costs 2 credits.";

export const scrapeLinkedinSchema = {
  linkedin_url: z.string().describe("The LinkedIn profile URL to scrape."),
};

type ScrapeLinkedinParams = {
  linkedin_url: string;
};

export const scrapeLinkedinTool = async ({
  linkedin_url,
}: ScrapeLinkedinParams) => {
  const apiUrl = new URL("https://search.clado.ai/api/enrich/scrape");
  apiUrl.searchParams.append("linkedin_url", linkedin_url);

  const response = await makeCladoRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to scrape LinkedIn profile: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `profile scraping completed successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
