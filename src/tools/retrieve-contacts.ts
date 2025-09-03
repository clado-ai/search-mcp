import { z } from "zod";
import { makeCladoRequest } from "../utils";

export const retrieveContactsName = "retrieve_contacts";

export const retrieveContactsDescription = "Retrieves email addresses and phone numbers for LinkedIn profiles. Supports reverse lookup via email or phone. Email enrichment costs 4 credits if found, phone enrichment costs 10 credits if found.";

export const retrieveContactsSchema = {
  linkedin_url: z.string().optional().describe("LinkedIn profile URL to get contact information for (e.g., 'https://www.linkedin.com/in/username')"),
  email: z.string().optional().describe("Email address to find profile and get contact information (e.g., 'john.doe@example.com')"),
  phone: z.string().optional().describe("Phone number to find profile and get contact information (e.g., '+1234567890')"),
  email_enrichment: z.boolean().default(false).describe("If true, returns emails (costs 4 credits if email found). Can be combined with phone_enrichment"),
  phone_enrichment: z.boolean().default(false).describe("If true, returns phone numbers (costs 10 credits if phone found). Can be combined with email_enrichment"),
};

type RetrieveContactsParams = {
  linkedin_url?: string;
  email?: string;
  phone?: string;
  email_enrichment?: boolean;
  phone_enrichment?: boolean;
};

export const retrieveContactsTool = async ({
  linkedin_url,
  email,
  phone,
  email_enrichment = false,
  phone_enrichment = false,
}: RetrieveContactsParams) => {
  const identifiers = [linkedin_url, email, phone].filter(Boolean);
  if (identifiers.length === 0) {
    throw new Error("Must provide exactly one of: LinkedIn URL, email, or phone number");
  }
  if (identifiers.length > 1) {
    throw new Error("Must provide exactly one of: LinkedIn URL, email, or phone number");
  }

  if (!email_enrichment && !phone_enrichment) {
    throw new Error("At least one enrichment type (email_enrichment or phone_enrichment) must be set to true");
  }

  const apiUrl = new URL("https://search.clado.ai/api/enrich/contacts");

  if (linkedin_url) {
    apiUrl.searchParams.append("linkedin_url", linkedin_url);
  } else if (email) {
    apiUrl.searchParams.append("email", email);
  } else if (phone) {
    apiUrl.searchParams.append("phone", phone);
  }

  apiUrl.searchParams.append("email_enrichment", String(email_enrichment));
  apiUrl.searchParams.append("phone_enrichment", String(phone_enrichment));

  const response = await makeCladoRequest(apiUrl.toString(), {});
  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      `Failed to retrieve contact information: ${JSON.stringify(responseData.error)}`
    );
  }

  let costMessage = "";
  if (responseData.data && responseData.data[0]) {
    const contactData = responseData.data[0];
    const hasEmails = contactData.contacts?.some((c: any) => c.type === "email");
    const hasPhones = contactData.contacts?.some((c: any) => c.type === "phone");
    
    const costs = [];
    if (email_enrichment && hasEmails) costs.push("4 credits for email");
    if (phone_enrichment && hasPhones) costs.push("10 credits for phone");
    
    if (costs.length > 0) {
      costMessage = ` (Cost: ${costs.join(" + ")})`;
    }
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `Contact information retrieved successfully${costMessage}: ${JSON.stringify(responseData, null, 2)}`
      }
    ]
  };
};
