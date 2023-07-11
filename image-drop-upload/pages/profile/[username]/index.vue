<template>
    <div class=" flex lg:flex-row flex-col gap-x-5 gap-y-5">
        <ProfileTab :user="user.user" />
        <div class="flex flex-col md:grow">
        
        <!-- loading -->
        <div v-if="pending" class="flex flex-row items-center justify-center gap-x-3">
            <UIcon class="text-lg" name="i-heroicons-photo"/>
                <div class="flex flex-col gap-y-0">
                    <p class="text-xl font-mono font-medium">Image Splash</p>
                    <p class="text-xs font-normal">Relax while we bring your amazing pictures...</p>
                </div>
            </div>
        <!-- error -->
            <div v-else-if="error" class="flex flex-row items-center justify-center gap-x-3">
            <UIcon class="text-lg" name="i-heroicons-photo"/>
                <div class="flex flex-col gap-y-1">
                    <p class="text-xl font-mono font-semibold">Ooops, Failed to fetch post</p>
                    <p class="text-xs font-normal">{{ error }}</p>
                <UButton icon="i-heroicons-heart" @click="handleRefresh()" class="w-fit" size="sm" label="Refresh" color="white" square variant="solid" />                        
                </div>
            </div>

            <div class="flex row w-full  mb-5 justify-between">
                <p class="font-bold text-lg">Your photos</p>
            </div>
            <!-- user posts -->
            <div else class="grid grid-cols-2 items-center md:grid-cols-4 gap-1">
                <div v-for="post in user.posts" :key="post.id" class="grid gap-1">
                <nuxt-link :to="`/photo/${post.uuid}`">
                    <div class="group">
                        <div class="relative overflow-hidden">
                            <nuxt-img class="h-auto max-w-full rounded-lg object-cover" loading="lazy" :src="baseUrl + post.image.url" />
                        <!-- <img class="h-auto max-w-full rounded-lg object-cover" :src="baseUrl + post.image.url" alt="test"> -->
                        <div class="absolute h-full  w-full rounded-lg px-5 py-5 bg-black/20 flex items-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div class="flex flex-col w-full h-full justify-between">
                                <!-- <button class="bg-black text-white py-2 px-5">Add to cart</button>
                                <button class="bg-black text-white py-2 px-5">Add to cart</button> -->
                                    <!-- download button -->
                                <!-- create info and download button -->

                                    <!-- action button -->
                                    <div class="flex flex-row gap-x-2 justify-end">
                                        <UButton icon="i-heroicons-plus" size="sm" color="white" square variant="solid" />                        
                                        <UButton icon="i-heroicons-arrow-down-tray" size="sm" color="white" square variant="solid" />                        
                                        <!-- <UButton icon="i-heroicons-eye" @click="isPostDetailModalOpen = true" size="sm" color="white" square variant="solid" />                        
                                        <UModal v-model="isPostDetailModalOpen">
                                            <PostDetails/>
                                        </UModal> -->
                                    </div>

                                <div class="flex flex-row justify-between items-center">
                                <!-- creator info -->
                                    <div class="flex flex-row items-center gap-x-3">
                                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="xs" alt="Avatar" />
                                        <div class="flex flex-col gap-y-0">
                                            <p class="text-sm font-medium text-white">{{ user.user.name}}</p>
                                            <p class="text-xs font-normal text-white">{{ user.user.username}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </nuxt-link>
                    <div>
                    <!-- <UButton label="Open"  /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
        <!-- notfications -->
        <UNotifications />
</template>
<script setup>


// fetch user assets
// get user id from store


const route = useRoute()
const runTimeConfig = useRuntimeConfig()
const baseUrl =  runTimeConfig.public.baseUrl



const { data:user, refresh, error, pending } = await useAsyncData(
  'mountains',
  () => $fetch(`${baseUrl}/api/user/${route.params.username}/posts`),
)


</script>
<style>
    
</style>