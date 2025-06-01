<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <UForm :schema="schema" :state="form" class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4 rounded-md shadow-sm bg-gray-600 p-4">
          <div>
            <UFormField label="Username" name="username" :error="errors.username" required>
              <UInput
                id="username"
                v-model="form.username"
                name="username"
                type="text"
                autocomplete="username"
                placeholder="Username"
                variant="outline"
                :class="{ 'border-red-300': errors.username }"
              />
            </UFormField>
          </div>
          <div>
            <UFormField label="Password" name="password" :error="errors.password">
              <UInput
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Password"
                :class="{ 'border-red-300': errors.password }"
              />
            </UFormField>
          </div>
        </div>

        <div v-if="loginError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ loginError }}</h3>
            </div>
          </div>
        </div>

        <div>
          <UButton
            type="submit"
            color="success"
            variant="solid"
            block
            :loading="isLoading"
            :disabled="isLoading"
          >
            Sign in
          </UButton>
        </div>
    </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { XCircleIcon } from '@heroicons/vue/24/solid'
import { $fetch } from 'ofetch' // Declare $fetch variable

const router = useRouter()
const isLoading = ref(false)
const loginError = ref('')

// Form state
const form = reactive({
  username: '',
  password: ''
})

// Form errors
const errors = reactive({
  username: '',
  password: ''
})

// Client-side validation schema with yup
const schema = yup.object({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required")
})

// Form submission handler
const handleSubmit = async () => {
  // Reset errors
  errors.username = ''
  errors.password = ''
  loginError.value = ''
  
  try {
    // Validate form with yup
    await schema.validate(form, { abortEarly: false })
    
    // If validation passes, submit to server
    isLoading.value = true
    
    const { data, error } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    
    if (error) {
      loginError.value = error.message || 'Login failed. Please try again.'
    } else if (data) {
      // Redirect to home page on successful login
      await router.push('/home')
    }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      // Handle Yup validation errors
      err.inner.forEach((error: any) => {
        if (error.path) {
          errors[error.path as keyof typeof errors] = error.message
        }
      })
    } else {
      loginError.value = err.data?.message || 'An unexpected error occurred'
      console.error(err)
    }
  } finally {
    isLoading.value = false
  }
}
</script>
