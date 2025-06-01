<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Nuxt Auth App</h1>
      <p class="text-gray-600 mb-6">Redirecting to login...</p>
      <div class="inline-block w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

// Redirect to login page
await navigateTo('/login')
</script>
