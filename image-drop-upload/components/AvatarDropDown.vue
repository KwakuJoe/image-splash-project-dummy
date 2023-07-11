<script setup lang="ts">
import {useUserStore} from '~/stores/user'

const userStore = useUserStore()

function navigate(){
  return navigateTo({
    path: '/',
    // query: {
    //   name: name.value,
    //   type: type.value
    // }
  })
}



async function logout() {
   await userStore.logout();

    userStore.authenticatedUser.token = null
    userStore.authenticatedUser.user = null
    
    await navigate();
}



const links = [{
  label: `${userStore.authenticatedUser.user?.username}`,
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  to:`profile/${userStore.authenticatedUser.user?.username}`
},  {
  label: 'Account Settings',
  icon: 'i-heroicons-chart-bar',
  to: ''
 },
]



</script>

<template>


  <UPopover>
      <!-- <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" /> -->
      <UAvatar :alt="userStore.authenticatedUser.user?.name" size="sm" />
    
      <template #panel>
        <!-- Content -->

        <UVerticalNavigation :links="links" />
          <hr />
        <UButton class=" border-0" @click="logout()" :loading="userStore.isLogoutLoading" icon="i-heroicons-arrow-left-on-rectangle" variant="link" color="white" label="logout"/>
      </template>
  </UPopover>
</template>
