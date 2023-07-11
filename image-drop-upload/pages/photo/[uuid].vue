<template>
  <!-- Header User iinfo with some ctions -->
  <div class="flex lg:flex-row flex-col  w-full items-start justify-between gap-y-4 my-8 ">
    <!-- creator info -->
    <div class="flex flex-row items-center gap-x-3">
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        size="lg"
        alt="Avatar"
      />

      {{ error }}
      <div class="flex flex-col gap-y-0">
        <p class="text-sm font-medium">{{ post.user.name }}</p>
        <p class="text-xs font-normal">{{ post.user.username }}</p>
      </div>
    </div>

    <!-- actions -->
    <div class="flex flex-row gap-x-2">
      <UButton
        icon="i-heroicons-heart"
        size="sm"
        color="white"
        square
        variant="solid"
      />
      <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="white"
        square
        variant="solid"
      />
      <UButton
        icon="i-heroicons-arrow-down"
        size="sm"
        color="primary"
        variant="solid"
        label="Download"
        :trailing="false"
      />
    </div>
  </div>
  <!-- image  here-->
  <div class="grid gap-4 justify-center mb-5">
    <div class="group">
      <div class="relative overflow-hidden">
        <img
          class="max-h-screen max-w-full object-cover"
          :src="`${baseUrl}${post.post.image.url}`"
          alt="test"
        />
        <div
          class="absolute h-full w-full px-5 py-5 bg-black/40 flex items-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div class="flex flex-col w-full h-full justify-between">
            <div class="flex flex-row gap-x-2 justify-end">
              <UButton
                icon="i-heroicons-heart"
                size="sm"
                color="white"
                square
                variant="solid"
              />
              <UButton
                icon="i-heroicons-plus"
                size="sm"
                color="white"
                square
                variant="solid"
              />
              <UButton
                icon="i-heroicons-arrow-down-tray"
                size="sm"
                color="white"
                square
                variant="solid"
              />
            </div>

            <div class="flex flex-row justify-between items-center">
              <!-- creator info -->
              <div class="flex flex-row items-center gap-x-3">
                <div class="flex flex-col gap-y-0">
                  <p class="text-base font-medium text-white">
                    {{ post.post.title }}
                  </p>
                  <p class="text-sm font-normal text-white">
                    {{ post.post.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <UButton label="Open"  /> -->
    </div>
  </div>

  <!-- just beow the image some ctions -->
  <div class="flex lg:flex-row flex-col  w-full items-start justify-between gap-y-4  mb-3">
    <!-- creator info -->
    <div class="flex flex-row items-center gap-x-3">
      <div class="flex flex-row gap-y-0 items-center gap-x-2">
        <UIcon name="i-heroicons-shield-check" />
        <p class="text-sm" >Free to use under the Image Splash license</p>
      </div>
      <UButton color="primary" label="Content license" variant="link" />
    </div>

    <!-- actions -->
    <div class="flex flex-row gap-x-2">
      <UButton
        icon="i-heroicons-heart"
        size="sm"
        color="white"
        square
        variant="solid"
      />
      <UButton
        icon="i-heroicons-information-circle"
        size="sm"
        color="white"
        label="Details"
        square
        variant="solid"
      />

    </div>
  </div>


  <!-- comment and user info-->

  <div class="flex flex-col lg:flex-row gap-x-5 gap-y-5">
    <div class="lg:w-1/2 w-full">
        <PostComment :post="post" />
    </div>
    <div class="lg:w-1/2 w-full">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">About the creator</h2>
            <!-- creator info -->
        <div class="flex flex-row items-center gap-x-5 py-5 flex-wrap gap-y-5">
            <UAvatar
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                size="lg"
                alt="Avatar"
            />
            <div class="flex flex-col gap-y-0">
                <p class="text-lg font-bold">{{ post.user.name }}</p>
                <p class="text-xs font-normal text-gray-400">{{ post.user.username }}</p>
            </div>
            <div class="flex flex-row gap-x-2">
                <UButton size="sm" color="white" :to="post.user.facebook_url" square variant="solid" >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                </UButton>
                <UButton size="sm" color="white" :to="post.user.twitter_url" square variant="solid" >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                        </path>
                    </svg>
                </UButton>
                <UButton size="sm" color="white" :to="post.user.linkedin_url" square variant="solid" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                </UButton>
                <UButton size="sm" color="white" :to="post.user.linkedin_url" square variant="solid" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                </UButton>

            </div>
        </div>
    </div>
  </div>
  <UNotifications />

</template>
<script setup>
const { uuid } = useRoute().params


// get all post
const runTimeConfig = useRuntimeConfig()
const baseUrl =  runTimeConfig.public.baseUrl

// const { data:post, refresh, error, pending } = await useAsyncData(
//   'mountains',
//   () => $fetch(`${baseUrl}/api/post/${uuid}`)
// )

const { data:post, pending, error, refresh } = await useFetch(`${baseUrl}/api/post/${uuid}`)
</script>
<style></style>
