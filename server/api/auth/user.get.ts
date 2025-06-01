import { defineEventHandler, createError } from "h3"
import { useSession } from "~/server/api/utils/session"

export default defineEventHandler(async (event) => {
  const session = await useSession(event)

  try {
    if (!session.data.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authenticated",
        data: { message: "User not authenticated" },
      })
    }

    return session.data.user
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: "An unexpected error occurred" },
    })
  }
})
