import { defineEventHandler } from "h3"
import { useSession } from "~/server/api/utils/session"

export default defineEventHandler(async (event) => {
  const session = await useSession(event)

  try {
    // Clear session
    await session.clear()

    return {
      success: true,
      message: "Logged out successfully",
    }
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false,
      message: "An error occurred during logout",
    }
  }
})
