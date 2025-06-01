// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  //CSS
  css: ['~/assets/css/main.css'],

  // TypeScript configuration
  typescript: {
    strict: false,
    typeCheck: true
  },
  
  // App configuration
  app: {
    head: {
      title: 'Nuxt Auth App',
      meta: [
        { name: 'description', content: 'A Nuxt.js authentication application with role-based access control' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Runtime config
  runtimeConfig: {
    // Private keys
    sessionSecret: process.env.SESSION_SECRET,
    
    // Public keys
    public: {
      appName: 'Nuxt Auth App'
    }
  },
  
  // Nitro configuration for server
  nitro: {
    experimental: {
      wasm: true
    }
  },
  
  // Build configuration
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue']
  },
  
  // PostCSS configuration
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  }
})
