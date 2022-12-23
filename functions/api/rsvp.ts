import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

const exampleApiRequest = {
  body: {
    message: "Hello World",
    input: {
      urlArgs: {},
      userAgent: "PostmanRuntime/7.29.2",
      requestUrl: "/api/rsvp",
      headers: {
        Accept: ["*/*"],
        "Accept-Encoding": ["gzip"],
        "Cache-Control": ["no-cache"],
        "Cdn-Loop": ["cloudflare"],
        "Cf-Connecting-Ip": ["47.189.53.50"],
        "Cf-Ipcountry": ["US"],
        "Cf-Ray": ["77e39a5b5bdfe873-DFW"],
        "Cf-Visitor": ['{"scheme":"https"}'],
        "Content-Length": ["108"],
        "Content-Type": ["application/json"],
        Cookie: [
          "__cf_bm=thtMc820fdgSi3eG1IISBZV0a3JNJHVQpiV5_vsMdwo-1671824677-0-AZwwXRe8hbHrte7cInyYjT+8hn57e0pxMhJ2NoJ35A4++1wSQ2cYOxdvMo+bqcgQO5viybRXgTRyoxdcMUTqwjY=",
        ],
        "Postman-Token": ["029cbbbe-d79c-4f59-a020-cf470a8fc18b"],
        "User-Agent": ["PostmanRuntime/7.29.2"],
        Via: ["1.1 google"],
        "X-Bot-Ja3-Hash": ["080027e640f8ec6d966f79fc2f7ca551"],
        "X-Bot-Score": ["10"],
        "X-Bot-Verified": ["false"],
        "X-Cloud-Trace-Context": [
          "926d6c355827ddde7d31d77cfc5b7523/11877680641863690764",
        ],
        "X-Forwarded-For": ["130.211.2.170"],
        "X-Forwarded-Host": [
          "transfertoyextpages-cunningly--driven--limpet-pgsdemo-com.preview.pagescdn.com",
        ],
        "X-Forwarded-Port": ["80"],
        "X-Forwarded-Proto": ["http"],
        "X-Forwarded-Server": ["2b0433facc04"],
        "X-Ip-City": ["Dallas"],
        "X-Ip-Continent": ["NA"],
        "X-Ip-Country": ["US"],
        "X-Ip-Is-Eu": ["false"],
        "X-Real-Ip": ["130.211.2.170"],
      },
      method: "POST",
      body: '{\n "email": "davish9@gmail.com",\n "phone": "12155346876",\n "note": "Yes",\n "attending": "true"\n}',
    },
  },
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
};

// Create a Zod schema for the entire exampleApiRequest above.
// Make sure the relevant parts are optional

const apiRequestSchema = z.object({
  method: z.string(),
  body: z.string(),
  urlArgs: z.object({}),
  userAgent: z.string(),
  requestUrl: z.string(),
  headers: z
    .object({
      Accept: z.array(z.string()),
      "Accept-Encoding": z.array(z.string()),
      "Cache-Control": z.array(z.string()),
      "Cdn-Loop": z.array(z.string()),
      "Cf-Connecting-Ip": z.array(z.string()),
      "Cf-Ipcountry": z.array(z.string()),
      "Cf-Ray": z.array(z.string()),
      "Cf-Visitor": z.array(z.string()),
      "Content-Length": z.array(z.string()),
      "Content-Type": z.array(z.string()),
      Cookie: z.array(z.string()),
      "Postman-Token": z.array(z.string()),
      "User-Agent": z.array(z.string()),
      Via: z.array(z.string()),
      "X-Bot-Ja3-Hash": z.array(z.string()),
      "X-Bot-Score": z.array(z.string()),
      "X-Bot-Verified": z.array(z.string()),
      "X-Cloud-Trace-Context": z.array(z.string()),
      "X-Forwarded-For": z.array(z.string()),
      "X-Forwarded-Host": z.array(z.string()),
      "X-Forwarded-Port": z.array(z.string()),
      "X-Forwarded-Proto": z.array(z.string()),
      "X-Forwarded-Server": z.array(z.string()),
      "X-Ip-City": z.array(z.string()),
      "X-Ip-Continent": z.array(z.string()),
      "X-Ip-Country": z.array(z.string()),
      "X-Ip-Is-Eu": z.array(z.string()),
      "X-Real-Ip": z.array(z.string()),
    })
    .optional(),
});

export type APIRequest = z.infer<typeof apiRequestSchema>;

export type APIResponse = {
  body: object;
  statusCode: number;
  headers: {
    "Content-Type": "application/json";
  };
};

export async function main(
  apiRequest: typeof exampleApiRequest
): Promise<APIResponse> {
  let parsedRequest: APIRequest;
  try {
    parsedRequest = apiRequestSchema.parse(apiRequest);
  } catch (e) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "Something went wrong parsing your request",
        error: e,
      },
      statusCode: 500,
    };
  }
  const body = JSON.parse(parsedRequest.body);
  if (!body) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "No body found!",
      },
      statusCode: 400,
    };
  }
  return {
    body: {
      message: "Hello World",
      parsedBody: body,
    },
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
}
