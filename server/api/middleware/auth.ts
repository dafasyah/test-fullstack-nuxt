import { defineEventHandler, createError } from "h3"
import { useSession } from "../utils/session"

export default defineEventHandler(async (event) => {

  const session = await useSession(event)
  const user = session.data.user

  if (
    event.node.req.url?.startsWith("/api/auth/login") ||
    event.node.req.url?.startsWith("/api/auth/logout") ||
    !event.node.req.url?.startsWith("/api/")
  ) {
    return
  }

  try {
    // Check if user is authenticated for protected API routes
    if (event.node.req.url?.startsWith("/api/") && !user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        data: { message: "Authentication required" },
      })
    }

    // Check if user is admin for admin API routes
    if (event.node.req.url?.startsWith("/api/admin") && user?.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
        data: { message: "Admin access required" },
      })
    }
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
