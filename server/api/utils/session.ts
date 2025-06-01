import { type H3Event, getCookie, setCookie, deleteCookie } from "h3"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"

// Interface type of session
interface Session {
  userId: string
  email?: string
  isAdmin?: boolean
}

// Create in-memory storage for sessions
const storage = createStorage({
  driver: memoryDriver(),
})

export async function useSession(event: H3Event) {
  // Get or create session ID from cookie
  const sessionId = getCookie(event, "sessionId") || crypto.randomUUID()

  // Set cookie if it doesn't exist
  if (!getCookie(event, "sessionId")) {
    setCookie(event, "sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    })
  }

  // Get session data
  const sessionData = (await storage.getItem(sessionId)) as Session || {}

  return {
    id: sessionId,
    data: sessionData as Record<string, any>,
    async update(data: Record<string, any>) {
      const newData = { ...sessionData, ...data }
      await storage.setItem(sessionId, newData)
      return newData
    },
    async clear() {
      await storage.removeItem(sessionId)
      deleteCookie(event, "sessionId")
    },
  }
}
