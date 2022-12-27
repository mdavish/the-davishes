import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

export const YEXT_API_KEY = "45f745962925f81cee994c3a6f642d75";

export const PHONE_REGEX = /^1?\d{10}$/;

// Identical to the form schema used in RSVPForm.tsx
export const requestPayloadSchema = z.object({
  guestId: z.string(),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX),
  note: z.string().optional(),
  "attending-0": z.coerce.number().min(0).max(2), // Welcome Drinks
  "attending-1": z.coerce.number().min(0).max(2), // Rehearsal Dinner
  "attending-2": z.coerce.number().min(0).max(2), // Wedding
});

export const apiRequestSchema = z.object({
  method: z.string(),
  body: z.string().optional(),
  urlArgs: z.object({}),
  userAgent: z.string(),
  requestUrl: z.string(),
  headers: z.any().optional(),
});

export type APIRequest = z.infer<typeof apiRequestSchema>;
export type RequestPayload = z.infer<typeof requestPayloadSchema>;

export type APIResponse = {
  body: string;
  statusCode: number;
  headers: {
    "Content-Type": "application/json";
    "Access-Control-Allow-Origin": "*";
  };
};

export async function main(apiRequest: APIRequest): Promise<APIResponse> {
  let parsedRequest: APIRequest;
  try {
    parsedRequest = apiRequestSchema.parse(apiRequest);
  } catch (e) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "No body found!",
      }),
      statusCode: 400,
    };
  }
  let parsedBody: RequestPayload;
  try {
    parsedBody = requestPayloadSchema.parse(JSON.parse(parsedRequest.body));
    // Get the data for this entity
    // TODO: Make this a POST request that actually updates the entity
  } catch (e) {
    console.log(e);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message:
          "Something went wrong in the zod parsing of your body. Please include a body of the form provided in the attached example.",
        example: {
          email: "davish9@gmail.com",
          phone: "1234567890",
          note: "I'm so excited to see you!",
          "attending-0": 0,
          "attending-1": 1,
          "attending-2": 2,
        },
        error: e,
      }),
      statusCode: 500,
    };
  }
  const res = await fetch(
    `https://api.yext.com/v2/accounts/me/entities/${parsedBody.guestId}?v=20221225&api_key=${YEXT_API_KEY}`,
    {
      method: "GET",
    }
  );
  if (res.status !== 200) {
    const error = await res.json();
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Something went wrong in the Yext API call.",
        error: error,
      }),
      statusCode: 500,
    };
  }
  const entityData = await res.json();
  console.log(entityData);
  return {
    body: JSON.stringify({
      message: "Hello World! The request has been successful.",
      parsedBody: parsedBody,
      entityData: entityData,
    }),
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
}
