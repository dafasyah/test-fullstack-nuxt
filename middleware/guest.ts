import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { $fetch } from "ofetch"

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const user = await $fetch("/api/auth/user")
    if (user) {
      return navigateTo("/home")
    }
  } catch (error) {
    // User is not authenticated, allow access to guest routes
  }
})
