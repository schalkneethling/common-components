import { z } from "zod";

export const BannerSchema = z.object({
  action: z.optional(
    z.object({
      type: z.enum(["button", "link"]),
      label: z.string().min(1, "Action label is required"),
      target: z.optional(z.enum(["_self", "_blank", "_parent", "_top"])),
      url: z.optional(z.url("Action URL must be a valid URL")),
    }),
  ),
  dismissable: z.optional(z.boolean().default(false)),
  dismissType: z.optional(
    z.enum(["permanent", "session", "page"]).default("page"),
  ),
  id: z.string("Banner ID is required"),
  message: z.string().min(5, "Banner message is required"),
  theme: z.optional(z.enum(["default", "success", "warning", "critical"])),
  role: z.optional(z.enum(["status", "alert"])),
});

export function validateBanner(banner, index) {
  try {
    return BannerSchema.parse(banner);
  } catch (error) {
    const bannerId = banner.id || `at index ${index}`;
    throw new Error(`Invalid banner ${bannerId}`, { cause: error });
  }
}
