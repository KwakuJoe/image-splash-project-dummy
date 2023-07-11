<template >
  <div class="flex flex-col w-full">
    <div class="flex flex-col lg:flex-row justify-start gap-x-10 gap-y-5">

      <!-- password change -->
      <div class="flex flex-col grow gap-y-4">
      <p class="font-medium text-xl">Close account</p>

      <!-- alert warning -->
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Warning!</span> closing your account is irreversible. It deletes all of your photos, collections, and stats.
          </div>
        </div>

        <!-- email -->
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Current password</p>
                <UInput type="password" color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>

            <!-- button -->
            <UButton label="Delete account" class="h-10" block />


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