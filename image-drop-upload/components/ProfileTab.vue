<script setup>

// recievinf props
// props
const props = defineProps({
  user: Object,
})

const user = ref(null)
user.value = props.user

const links = [
  {
    label: "Collection",
    icon: "i-heroicons-queue-list",
    to: "/profile/[username]/collections",
  },
  {
    label: "Stats",
    icon: "i-heroicons-chart-bar",
    to: "/profile/[username]/stats",
  },
];
</script>

<template>
  <div
    class="flex md:w-1/3 bg-slate-50 dark:bg-slate-800 rounded-lg py-10 px-5"
  >
    <div class="flex-col flex">
      <!-- avatar -->
      
        <div class="flex flex-row items-center justify-center">
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            size="3xl"
            alt="Avatar"
          />
        </div>
        <!-- name -->
        <div
          class="flex flex-row items-center justify-center gap-x-2 my-3 w-full"
        > 
        <div class="flex flex-col items-center justify-center align-middle gap-y-1">
          <p class="text-center font-bold text-2xl">{{ user.name }}</p>
          <p class="text-center text-gray-300  text-sm">@{{ user.username }}</p>
          <UButton color="gray" size="xs" label="Edit" variant="solid" />
        
        </div>
        </div>
        <!-- bio -->
        
        <p class="text-sm font-normal text-center text-gray-500">{{ user.bio === ''? 'No bio, click on the edit to update your profile' : user.bio }}</p>
        <!-- location -->
        <div class="flex flex-row justify-center items-center my-2">
          <UIcon name="i-heroicons-map-pin" />
          <p>{{ user.bio === ''? 'N/A' : user.bio }}</p>
        </div>

        <div class="flex flex-row items-start">
          <p class="item-start text-xs text-gray-500 mt-5">Socials</p>
        </div>
        <!-- social link -->
        <div class="flex-row flex my-3">
          <div class="flex flex-row items-center">
            <UIcon name="i-heroicons-map-pin" />
            <UButton
              variant="link"
              color="white"
              :to="user.twitter_url"
              label="Twitter"
            />
          </div>
          <div class="flex flex-row items-center">
            <UIcon name="i-heroicons-map-pin" />
            <UButton
              variant="link"
              color="white"
              :to="user.facebook_url"
              label="Facebook"
            />
          </div>
          <div class="flex flex-row items-center">
            <UIcon name="i-heroicons-map-pin" />
            <UButton
              variant="link"
              color="white"
              :to="user.linkedin_url"
              label="LinkedIn"
            />
          </div>
        </div>

       <UVerticalNavigation :links="links" />
    </div>
  </div>
</template>
