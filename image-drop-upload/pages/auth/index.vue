<template>
  <div class="flex flex-col gap-y-5">
    <form  @submit.prevent="onSubmit">
    <p class="font-bold text-2xl justify-start mb-2">Join image Splash today</p>
    <p class="text-sm text-gray-500 mb-5">
      Access 5,219,020 free, high-resolution photos you can’t find anywhere else
    </p>

    {{ user.username }}

    {{ userStore.create_user.name  }}

    <div class="flex flex-row gap-y-2 justify-between gap-x-2 mb-2">
      <div class="flex flex-col gap-y-2 w-full">
        <p class="text-sm font-medium">Username</p>
        <UInput
          color="gray"
          v-bind="username"
          v-model="user.username"
          placeholder="eg. John Doe"
          class="w-full h-10"
          variant="outline"
        />
        <div class="text-sm font-medium text-red-500">{{ errors.username }}</div>
      </div>
      <div class="flex flex-col gap-y-2 w-full mb-2">
        <p class="text-sm font-medium">Full name</p>
        <UInput
          color="gray"
          v-model="user.name"
          v-bind="name"
          placeholder="eg. John Doe"
          class="w-full h-10"
          variant="outline"
        />
        <div class="text-sm font-medium text-red-500">{{ errors.name }}</div>

      </div>
    </div>

    <div class="flex flex-col gap-y-2 mb-2">
      <p class="text-sm font-medium">Email</p>
      <UInput
        color="gray"
        v-bind="email"
        v-model="user.email"
        placeholder="eg. John Doe"
        class="w-full h-10"
        variant="outline"
      />
      <div class="text-sm font-medium text-red-500">{{ errors.email }}</div>
    </div>

    <div class="flex flex-col gap-y-2 mb-2">
      <p class="text-sm font-medium">Password</p>
      <UInput
        icon="i-heroicons-lock-closed"
        v-model="user.password"
        color="gray"
        v-bind="password"
        type="password"
        block
        placeholder="eg. John Doe"
        class="w-full h-10"
        variant="outline"
        :trailing="true"
      />
      <div class="text-sm font-medium text-red-500">{{ errors.password }}</div>

    </div>

    <div class="flex flex-col gap-y-2 mb-2">
      <p class="text-sm font-medium">Confirm Password</p>
      <UInput
        icon="i-heroicons-lock-closed"
        color="gray"
        v-bind="passwordConfirmation"
        type="password"
        block
        placeholder="eg. John Doe"
        class="w-full h-10"
        variant="outline"
        :trailing="true"
      />
      <div class="text-sm font-medium text-red-500">{{ errors.passwordConfirmation }}</div>

    </div>

    <UButton
      label="Join"
      class="h-10"
      type="submit"
      @click="signup()"
      block
      :loading="userStore.isSignupLoading"
    />

  </form>
  </div>

<!-- notfications -->
<UNotifications />
</template>
<script setup>
import {useUserStore} from '~/stores/user'
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const userStore = useUserStore();

//   createuser
const user = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
});


const { errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    username: yup.string().required('username is required to create an account'),
    name: yup.string().required('name is required to create an account'),
    email: yup.string().email('Enter a valid email address eg. johndoe@mail.com').required('email is required to create an account'),
    password: yup.string().min(8).required('password is required to create an account'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
  }),
});

const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values, null, 2));

});

const email = defineInputBinds('email');
const password = defineInputBinds('password');
const username = defineInputBinds('username');
const name = defineInputBinds('name');
const passwordConfirmation = defineInputBinds('passwordConfirmation');




async function signup() {

  try{
    // userStore.create_user = 

    userStore.create_user.name = user.name
    userStore.create_user.username = user.username
    userStore.create_user.email = user.email
    userStore.create_user.password = user.password

    const res = await userStore.signup();

    if(res.data.message === 'User created successfully'){

      console.log(res.data)

    }

  }catch(error){
    
    console.log(error);
  }
}

import { reactive } from "vue";
definePageMeta({
  layout: "authlayout",
});
</script>
<style></style>
