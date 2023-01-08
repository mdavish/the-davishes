import { z } from "zod";

export const photoSchema = z.object({
  alternateText: z.string().optional(),
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

export const faqSchema = z.object({
  name: z.string(),
  answer: z.string(),
});

export const addressSchema = z.object({
  line1: z.string(),
  line2: z.optional(z.string()),
  city: z.string(),
  region: z.string().optional(),
  postalCode: z.string(),
});

export const locationSchema = z.object({
  name: z.string(),
  address: addressSchema,
  c_weddingDescription: z.string().optional(),
  c_locationTypre: z.enum(["RECOMMENDATION", "EVENT_VENUE"]).optional(),
  c_photo: photoSchema.optional(),
  priceRange: z.enum(["ONE", "TWO", "THREE", "FOUR"]).optional(),
});

export const eventSchema = z.object({
  name: z.string(),
  c_eventPhoto: photoSchema.optional(),
  description: z.string(),
  time: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  }),
  c_eventLocation: z.array(locationSchema).min(1).max(1),
});

export const itinerarySchema = z.array(eventSchema);

export const siteSchema = z.object({
  name: z.string(),
  c_dominantPhoto: photoSchema,
  c_secondPhoto: photoSchema,
  c_thirdPhoto: photoSchema,
  c_ourStoryCopy: z.string(),
  c_ourStoryPhoto: photoSchema,
  c_faqs: z.array(faqSchema),
  c_itinerary: itinerarySchema,
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
  address: z.optional(addressSchema),
  c_side: z.enum(["MAX", "ASHLEY"]),
  c_notes: z.optional(z.string()),
  c_plusOneDetails: z.optional(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
  ),
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
export type Event = z.infer<typeof eventSchema>;
export type Itinerary = z.infer<typeof itinerarySchema>;
export type Location = z.infer<typeof locationSchema>;
export type Address = z.infer<typeof addressSchema>;
export type FAQ = z.infer<typeof faqSchema>;
