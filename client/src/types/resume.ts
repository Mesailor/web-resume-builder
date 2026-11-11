import * as z from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  headline: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  socialNetworks: z.object({
    linkedin: z.url("LinkedIn must be a valid URL.").optional(),
    github: z.url("LinkedIn must be a valid URL.").optional(),
    telegram: z.url("LinkedIn must be a valid URL.").optional(),
  }),
});

export type Resume = z.infer<typeof resumeSchema>;

export const DEFAULT_RESUME_VALUES: Resume = {
  name: "",
  headline: "",
  location: "",
  email: "",
  phone: "",
  socialNetworks: {},
};
