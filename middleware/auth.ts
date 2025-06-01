import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { $fetch } from "ofetch"

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const user = await $fetch("/api/auth/user")
    if (!user) {
      return navigateTo("/login")
    }
  } catch (error) {
    return navigateTo("/login")
  }
})
