<template>
  <div class="flex lg:flex-row flex-col gap-x-5 gap-y-5">
    <!-- <ProfileTab/> -->
    <div class="flex flex-col md:grow">
      <!-- loading -->
      <div class="flex flex-row items-center justify-center gap-x-3">
        <UIcon class="text-lg" name="i-heroicons-photo" />
        <div class="flex flex-col gap-y-0">
          <p class="text-xl font-mono font-medium">Image Splash</p>
          <p class="text-xs font-normal">
            Relax while we bring your amazing pictures...
          </p>
        </div>
      </div>
      <!-- error -->
      <div class="flex flex-row items-center justify-center gap-x-3">
        <UIcon class="text-lg" name="i-heroicons-photo" />
        <div class="flex flex-col gap-y-1">
          <p class="text-xl font-mono font-semibold">
            Ooops, Failed to fetch post
          </p>
          <p class="text-xs font-normal">Error here</p>
          <UButton
            icon="i-heroicons-heart"
            @click="handleRefresh()"
            class="w-fit"
            size="sm"
            label="Refresh"
            color="white"
            square
            variant="solid"
          />
        </div>
      </div>

      <div class="flex row w-full mb-5 justify-between">
        <p class="font-bold text-lg">Your Collections</p>
        <UButton label="+ Add new Collection" />
      </div>

      <!-- user collections -->

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div class="group">
              <div class="relative overflow-hidden">
                <nuxt-img
                  class="h-auto max-w-full object-cover"
                  loading="lazy"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                />
                <!-- <img class="h-auto max-w-full rounded-lg object-cover" :src="baseUrl + post.image.url" alt="test"> -->
                <div
                  class="absolute h-full w-full px-5 py-5 bg-black/20 flex items-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div class="flex flex-col w-full h-full justify-between">
                    <!-- action button -->
                    <div class="flex flex-row gap-x-2 justify-end">
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
                          <p class="text-sm font-medium text-white">Collection name</p>
                          <p class="text-xs font-normal text-white">2 Saved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <!-- notfications -->
  <UNotifications />
</template>
<script setup></script>
<style></style>
