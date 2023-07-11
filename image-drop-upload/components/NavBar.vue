<template>
  <nav class="">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div class="flex items-center">
        <!-- logo -->
        <h5 class="font-bold">Image Splash</h5>
      </div>

      <!-- toggle buttom -->
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-1 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <div class="flex gap-x-4">
          <div class="flex">
            <SearchField />
          </div>
          <div class="flex">
            <UButton color="black" label="Explore" variant="link" />
            <UButton color="black" to="" label="Advertise" variant="link" />
          </div>
          <p>|</p>

          <client-only>
            <div
              v-if="userStore.authenticatedUser.token?.token"
              class="flex gap-x-5"
            >
              <UButton
                @click="isOpen = true"
                size="sm"
                color="primary"
                variant="solid"
                label="Submit a photo"
                :trailing="false"
              />
              <UModal v-model="isOpen">
                <!-- Content -->
                <DropFileCoponent />
              </UModal>
              <AvatarDropDown />
            </div>
            <div v-else class="flex">
              <UButton
                color="black"
                to="/auth/login"
                label="Login"
                variant="link"
              />
            </div>
          </client-only>

          <!-- togleg -->
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

// const isAuthenticated = ref<boolean>(false)

watch(userStore.authenticatedUser, (newValue, oldValue) => {
  console.log(`New value: ${newValue.token?.token}`);
  console.log(`Old value: ${oldValue.token?.token}`);
});



// model toggler
const isOpen = ref(false);
</script>
