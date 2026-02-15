import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCoreSchema = z.object({
  email: z.preprocess(
    (v) => (v == null ? "" : v),
    z.string().min(1, "Email is required").email("Enter a valid email")
  ),
  name: z.string(),
});

export const onboardUserSchema = userCoreSchema.extend({
  password: z.preprocess(
    (v) => (v == null ? "" : v),
    z.string().min(1, "Password is required")
  ),
});

export const onboardUserResponseSchema = userCoreSchema.extend({
    id: z.number()
});

const loginSchema = z.object({
  email: z.preprocess(
    (v) => (v == null ? "" : v),
    z.string().min(1, "Email is required").email("Enter a valid email")
  ),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string()
});

export type OnboardUserInput = z.infer<typeof onboardUserSchema>;
export type loginUserInput = z.infer<typeof onboardUserSchema>;

export const { schemas: userSchema, $ref } = buildJsonSchemas({
  onboardUserSchema,
  onboardUserResponseSchema,
  loginSchema,
  loginResponseSchema
});
