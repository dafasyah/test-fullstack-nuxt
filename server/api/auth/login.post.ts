import { defineEventHandler, readBody, createError } from "h3"
import { validateLogin, authenticateUser } from "~/server/api/services/auth"
import { useSession } from "~/server/api/utils/session"

export default defineEventHandler(async (event) => {
  const session = await useSession(event)

  try {
    // Get request body
    const body = await readBody(event)

    // Validate input with Zod
    const validation = await validateLogin(body)

    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid input",
        data: { message: "Invalid username or password format" },
      })
    }

    // Authenticate user
    const { username, password } = validation.data
    const user = await authenticateUser(username, password)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        data: { message: "Invalid username or password" },
      })
    }

    // Store user in session (excluding password)
    await session.update({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
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
