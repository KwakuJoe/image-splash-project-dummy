<template>
        <!-- category header -->
        <div class="flex justify-start align-middle gap-x-5 mb-4 lg:my-10">
            <p class="">Editoria |</p>
            <CategoryDropDown/>
        </div>

        <!-- image -->
        <div>
            <UButton @click="refresh()" label="refresh" />
            <ImageGridView :posts="posts" :error="error" :pending="pending" @refreshPostsPage="handleRefresh"/>
        </div>
        <!-- notfications -->
        <UNotifications />
</template>
<script setup>

     const handleRefresh = () => {
        console.log('refresh from main')
         refresh()
    }
// get all post
const runTimeConfig = useRuntimeConfig()
const baseUrl =  runTimeConfig.public.baseUrl

const { data:posts, refresh, error, pending } = await useAsyncData(
  'mountains',
  () => $fetch(`${baseUrl}/api/posts`)
)


useIntervalFn(() => {
  console.log(`refreshing the data again ${new Date().toISOString()}`)
  refresh() // will call the 'todos' endpoint, just above
}, 10000) //
</script>
<style>
    
</style>