<template>
  <div>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})
</script>
