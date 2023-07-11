<template >
  <div class="flex flex-col w-full">
    <div class="flex flex-col lg:flex-row justify-start gap-x-10 gap-y-5">

      <!-- avatar edit -->
      <div class="flex flex-col items-center gap-y-2">
        <UAvatar size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        <UButton label="Change profile" color="white" variant="link"/>
      </div>

      <!-- user data field -->
      <div class="flex flex-col grow gap-y-4">

        <!-- username and name -->
        <div class="flex flex-row gap-y-2 justify-between gap-x-5">
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
        </div>

        <!-- email -->
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UTextarea color="gray" placeholder="bio" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>

            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Username</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>

            <!-- button -->
            <UButton label="Update account" class="h-10" block />


     </div>
    </div>
  </div>
</template>
<script setup>
  definePageMeta({
    layout:'user-account-layout',
  })
</script>
<style >

</style>