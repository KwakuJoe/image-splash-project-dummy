<template>

<div v-if="pending" class="flex flex-row items-center justify-center gap-x-3">
    <UIcon class="text-lg" name="i-heroicons-photo"/>
        <div class="flex flex-col gap-y-0">
            <p class="text-xl font-mono font-medium">Image Splash</p>
            <p class="text-xs font-normal">Relax while we bring your amazing pictures...</p>
        </div>
    </div>

    <div v-else-if="error.value" class="flex flex-row items-center justify-center gap-x-3">
    <UIcon class="text-lg" name="i-heroicons-photo"/>
        <div class="flex flex-col gap-y-1">
            <p class="text-xl font-mono font-semibold">Ooops, Failed to fetch post</p>
            <p class="text-xs font-normal">{{ error }}</p>
        <UButton icon="i-heroicons-heart" @click="handleRefresh" class="w-fit" size="sm" label="Refresh" color="white" square variant="solid" />                        
        </div>
    </div>


<div else class="grid grid-cols-2 items-center md:grid-cols-4 gap-1">
    <div v-for="post in posts.posts" :key="post.id" class="grid gap-1">
    <nuxt-link :to="`/photo/${post.uuid}`">
        <div class="group">
            <div class="relative overflow-hidden">
                <nuxt-img class="h-auto max-w-full rounded-lg object-cover" loading="lazy" :src="baseUrl + post.image.url" />
            <!-- <img class="h-auto max-w-full rounded-lg object-cover" :src="baseUrl + post.image.url" alt="test"> -->
            <div class="absolute h-full  w-full rounded-lg px-5 py-5 bg-black/20 flex items-end -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div class="flex flex-col w-full h-full justify-between">

                        <!-- action button -->
                        <div class="flex flex-row gap-x-2 justify-end">
                        <!-- {{ user.authenticatedUser.user?.id }} -->
                            <UButton icon="i-heroicons-plus" size="sm" color="white" square variant="solid" />                        
                            <UButton icon="i-heroicons-arrow-down-tray" size="sm" color="white" square variant="solid" />    
                        </div>

                    <div class="flex flex-row justify-between items-center">
                    <!-- creator info -->
                        <div class="flex flex-row items-center gap-x-3">
                            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="xs" alt="Avatar" />
                            <div class="flex flex-col gap-y-0">
                                <p class="text-sm font-medium text-white">{{ post.user.name }}</p>
                                <p class="text-xs font-normal text-white">{{ post.user.username }}</p>
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

</template>
<script setup>
import { usePostStore } from '~/stores/post_store';
import { useUserStore } from '~/stores/user';

const user = useUserStore()
const postStore = usePostStore()
// gte base Url
const runTimeConfig = useRuntimeConfig()
const baseUrl =  runTimeConfig.public.baseUrl


// })

const emit = defineEmits(['refreshPostsPage'])

function handleRefresh(){
    console.log('refreshing from imageGrid')
    // emit('refreshPostsPage');
}

console.log(typeof user.authenticatedUser.user?.id)
// props
const props = defineProps({
  posts: Object,
  loading: Boolean,
  error: Object,
  pending: Boolean,
})


const posts = reactive({
    message:null,
    posts: null
})

posts.posts = props.posts?.posts


// pending
const pending = ref(false)
pending.value = props.pending


// error
const error = reactive({})
error.value = props.error



async function handlRemoveLike(postId){

    alert(` unliked ${postId}`)
}

// liking post
async function handleLike(postId){

    postStore.postId = postId
    console.log(postStore.postId)

    const res = await postStore.likePost()

    try{
    
        if(res.data.message === 'post liked successfully'){
            console.log(res.data)
        }

    }catch(error){

        console.log(error.message);

    }

}


</script>
<style>
    
</style>