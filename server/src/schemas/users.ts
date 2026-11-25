import * as z from "zod";

export const UserCreateSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  name: z.string().trim().min(1).max(100).nullish(),
});

export const UserUpdateSchema = UserCreateSchema.partial();
