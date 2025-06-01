import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { $fetch } from "ofetch"

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const user = await $fetch("/api/auth/user")
    if (!user || user.role !== "admin") {
      return navigateTo("/home")
    }
  } catch (error) {
    return navigateTo("/login")
  }
})
