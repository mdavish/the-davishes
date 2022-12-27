import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { APIRequest, RequestPayload, main } from "./rsvp.ts";

Deno.test("Respond successfuly to request", async () => {
  const payload: RequestPayload = {
    guestId: "max-davish",
    "attending-0": 1,
    "attending-1": 1,
    "attending-2": 1,
    phone: "12155346876",
    email: "davish9@gmail.com",
    note: "I'm so excited!",
  };

  const request: APIRequest = {
    method: "POST",
    body: JSON.stringify(payload),
    urlArgs: {},
    userAgent: "Deno",
    requestUrl: "http://localhost:3000/api/rsvp",
    headers: {},
  };

  const response = await main(request);
  console.log(response);
  assertEquals(response.statusCode, 200);
  return;
});
