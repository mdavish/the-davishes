import { z } from "zod";

export const photoSchema = z.object({
  alternateText: z.string(),
  url: z.string(),
  height: z.number(),
  width: z.number(),
});

export const contentBlockSchema = z.object({
  name: z.string(),
  c_content: z.string(),
  c_linkedEntities: z.optional(z.array(z.any())),
  c_dominantPhoto: z.optional(photoSchema),
  c_secondaryPhoto: z.optional(photoSchema),
});

export const siteSchema = z.object({
  name: z.string(),
  c_dominantPhoto: photoSchema,
  c_contentBlocks: z.optional(z.array(contentBlockSchema)),
});

export const weddingGuest = z.object({
  meta: z.object({
    accountId: z.string(),
    uid: z.string(),
    id: z.string(),
  }),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  headshot: z.optional(photoSchema),
  c_hasPlusOne: z.optional(z.boolean()),
  c_rSVPStatus: z.optional(z.enum(["ATTENDING", "NOT_ATTENDING"])),
  mainPhoneNumber: z.optional(z.string()),
  c_guestEmail: z.optional(z.string()),
  address: z.optional(
    z.object({
      line1: z.string(),
      line2: z.optional(z.string()),
      city: z.string(),
      region: z.string(),
      postalCode: z.string(),
      countryCode: z.string(),
    })
  ),
  c_side: z.enum(["MAX", "ASHLEY"]),
  c_notes: z.optional(z.string()),
});

export const weddingGuestAPIResponseSchema = z.object({
  meta: z.object({
    uuid: z.string(),
  }),
  response: z.object({
    entities: z.array(weddingGuest),
    count: z.number(),
  }),
});

export type Site = z.infer<typeof siteSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type Photo = z.infer<typeof photoSchema>;
export type WeddingGuest = z.infer<typeof weddingGuest>;
export type WeddingGuestAPIResponse = z.infer<
  typeof weddingGuestAPIResponseSchema
>;
