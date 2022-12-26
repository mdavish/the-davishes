import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

// Create a Zod schema for the entire exampleApiRequest above.
// Make sure the relevant parts are optional.
const apiRequestSchema = z.object({
  method: z.string(),
  body: z.string().optional(),
  urlArgs: z.object({}),
  userAgent: z.string(),
  requestUrl: z.string(),
  headers: z.any().optional(),
});

export type APIRequest = z.infer<typeof apiRequestSchema>;

export type APIResponse = {
  body: string;
  statusCode: number;
  headers: {
    "Content-Type": "application/json";
  };
};

const updateYextEntity = async (entityId: string, data: any): string => {
  return "yes";
};

export async function main(apiRequest: APIRequest): Promise<APIResponse> {
  let parsedRequest: APIRequest;
  await setTimeout(() => {
    console.log("waiting so that Deno doesn't yell at me");
  }, 1000);
  try {
    parsedRequest = apiRequestSchema.parse(apiRequest);
  } catch (e) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Something went wrong in the zod parsing of your request.",
        error: e,
      }),
      statusCode: 500,
    };
  }
  if (!parsedRequest.body) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "No body found!",
      }),
      statusCode: 400,
    };
  }
  const parsedBody = JSON.parse(parsedRequest.body);
  return {
    body: JSON.stringify({
      message: "Hello World! The request has been successful.",
      parsedBody: parsedBody,
    }),
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
}
