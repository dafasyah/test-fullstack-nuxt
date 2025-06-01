<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold text-gray-900">Welcome, {{ user?.username }}</h1>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">You are logged in as {{ user?.role }}</p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-4">
            <p class="text-gray-700">This is your dashboard. You can access the following pages:</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton to="/home" variant="solid" color="primary">Home</UButton>
              <UButton 
                v-if="user?.role === 'admin'" 
                to="/admin" 
                variant="solid" 
                color="success"
              >
                Admin Panel
              </UButton>
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
import { definePageMeta } from '#imports'
import { useFetch } from '#app'

definePageMeta({
  middleware: ['auth']
})

const router = useRouter()
const { data: user } = useFetch('/api/auth/user')

const handleLogout = async () => {
  try {
    await useFetch('/api/auth/logout', { method: 'POST' })
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
