import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const retrieveContactsName = "retrieve_contacts";

export const retrieveContactsDescription = "Retrieves email addresses and phone numbers for a LinkedIn profile. Each lookup costs 1 credit.";

export const retrieveContactsSchema = {
  linkedin_url: z.string().describe("The LinkedIn profile URL to look up."),
};

type RetrieveContactsParams = {
  linkedin_url: string;
};

export const retrieveContactsTool = async ({
  linkedin_url,
}: RetrieveContactsParams) => {
  const apiUrl = new URL("https://search.clado.ai/api/enrich/contacts");
  apiUrl.searchParams.append("linkedin_url", linkedin_url);

  const response = await makeCladoRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to retrieve contact information: ${JSON.stringify(responseData.error)}`
    );
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `contact information retrieved successfully: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
