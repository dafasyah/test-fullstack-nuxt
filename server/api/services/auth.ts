import { getUser, getUserById } from "../repositories/user"
import { z } from "zod"

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, { message: "Password must be at least 4 characters" }),
})

export type LoginInput = z.infer<typeof loginSchema>

export async function validateLogin(input: LoginInput) {
  return loginSchema.safeParse(input)
}

export async function authenticateUser(username: string, password: string) {
  return getUser(username, password)
}

export async function getUserFromSession(userId: string) {
  return getUserById(userId)
}
