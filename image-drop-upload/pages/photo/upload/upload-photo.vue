<template>
        <div class="flex lg:flex-row flex-col justify-center mt-5">
            <div class="lg:w-64 m-5 flex-col flex ">
                <p class=" text-base font-semibold mb-5">Supported file types</p>
                <div class="flex flex-col justify-start mb-5 gap-y-2">
                    <p class=" text-xs font-semibold">File uploaded should be jpeg, jpg or png ...</p>
                    <p class=" text-xs font-normal">JPG, PNG, PSD, AI, and SVG images up to 40 MB with at least 3000 pixels along one side.</p>
                    <UButton label=" Image Quality Guidelines..." size="xs" variant="link" /> 
                    
                </div>

                
                <div class="flex flex-col justify-start mb-5 gap-y-2">
                    <p class=" text-xs font-semibold">File uploaded should be jpeg, jpg or png ...</p>
                    <p class=" text-xs font-normal">JPG, PNG, PSD, AI, and SVG images up to 40 MB with at least 3000 pixels along one side.</p>
                    <UButton label=" Image Quality Guidelines..." size="xs" variant="link" /> 
                    
                </div>

                <div class="flex flex-col justify-start mb-5 gap-y-2">
                    <p class=" text-xs font-semibold">File uploaded should be jpeg, jpg or png ...</p>
                    <p class=" text-xs font-normal">JPG, PNG, PSD, AI, and SVG images up to 40 MB with at least 3000 pixels along one side.</p>
                    <UButton label=" Image Quality Guidelines..." size="xs" variant="link" /> 
                    
                </div>
            </div>
            <div class="flex flex-row grow m-5 lg:grow ">
                <DropFileCoponent :categories="category.categories" />
            </div>
        </div>
        <!-- notfications -->
        <UNotifications />
</template>
<script setup>
const runTimeConfig = useRuntimeConfig()
const baseUrl =  runTimeConfig.public.baseUrl

    //get categories
    const { data:category, pending, error, refresh } = await useFetch(`${baseUrl}/api/categories`)
    


</script>
<style>
    
</style>