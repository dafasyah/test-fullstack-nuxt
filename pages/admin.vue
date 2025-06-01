<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Welcome to the admin area</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-4">
            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">Admin Access Only</h3>
                  <div class="mt-2 text-sm text-yellow-700">
                    <p>This page is only accessible to admin users. Employee users will be redirected.</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-gray-700">This page contains admin-only functionality and data.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton to="/home" variant="outline" color="primary">Back to Home</UButton>
              <UButton @click="handleLogout" variant="outline" color="error">Logout</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useFetch } from '#app'

definePageMeta({
  middleware: ['auth', 'admin']
})

const router = useRouter()
const $fetch = useFetch

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
