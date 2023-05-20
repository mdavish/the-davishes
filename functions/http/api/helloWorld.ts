import * as twilio from "https://deno.land/x/twilio@0.1.1/Twilio.ts";

interface FunctionArgument {
  queryParams: { [key: string]: string };
  pathParams: { [key: string]: string };
  site: Site;
}

interface Site {
  branchId: string;
  businessId: string;
  businessName: string;
  commitHash: string;
  commitMessage: string;
  deployId: string;
  displayUrlPrefix: string;
  invocationContext: "local" | "preview" | "staging" | "production" | null;
  partnerId: string;
  platformUrl: string;
  previewDomain: string;
  productionDomain: string;
  repoBranchName: string;
  repoBranchUrl: string;
  repoUrl: string;
  siteId: string;
  siteName: string;
  stagingDomain: string;
  yextUniverse: "development" | "qa" | "sandbox" | "production" | null;
}

interface ReturnValue {
  body: string;
  statusCode: number;
  headers: object;
}

export default function helloWorld(request: FunctionArgument): ReturnValue {
  const { pathParams, queryParams, site } = request;

  return {
    body: "Hello World",
    headers: {},
    statusCode: 200,
  };
}
