<template >
  <div class="flex flex-col w-full">
    <div class="flex flex-col lg:flex-row justify-start gap-x-10 gap-y-5">

      <!-- password change -->
      <div class="flex flex-col grow gap-y-4">

        <!-- email -->
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Current password</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">New password</p>
                <UInput color="gray" placeholder="eg. John Doe" class="w-full h-10" variant="outline" />
            </div>
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Confirm new password</p>
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