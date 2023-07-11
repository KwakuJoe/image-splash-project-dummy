// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  runtimeConfig: {
    public:{
      baseUrl:'http://127.0.0.1:3333', 
      // encryptStorageKey:'8Jv7sT3qL4fRnKpW9yXh6ZbN2mUcDxG5'
    }
  },
  modules: ['@nuxthq/ui', '@vueuse/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/image'],
  devtools: { enabled: true },
  
})
