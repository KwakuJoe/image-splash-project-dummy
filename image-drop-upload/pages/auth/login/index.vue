<template>

    <div class="flex flex-row justify-center mt-10">

        <div class="flex flex-col lg:w-1/3 gap-y-4">
        <div>
            <p class="font-bold text-2xl justify-start">Login into your account?</p>
            <p class="text-sm text-gray-500">Welcome back</p>
        </div>
        
        <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Email</p>
                <UInput color="gray" v-bind="email" v-model="user_login.email" placeholder="eg. john@example.com" class="w-full h-10" variant="outline" />
                <div class="text-sm font-medium text-red-500">{{ errors.email }}</div>
            </div>

            <div class="flex flex-col gap-y-2 w-full">
                <p class="text-sm font-medium">Password</p>
                <UInput icon="i-heroicons-lock-closed" v-bind ="password" v-model="user_login.password" color="gray" type="password" block placeholder="password" class="w-full h-10" variant="outline" :trailing="true" />
                <div class="text-sm font-medium text-red-500">{{ errors.password }}</div>
                <UButton color="black" class="text-xs font-light text-gray-300" label="Forgot your password? click to reset" variant="link" />

            </div>

            <UButton label="Join" :loading="userStore.isLoginLoading" @click="login()" class="h-10" block />
        </form>
        </div>
    </div>
<!-- notfications -->
<UNotifications />
</template>
<script setup lang="ts">
import {useUserStore} from '~/stores/user'
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const userStore = useUserStore();

//   createuser
const user_login = reactive({
  email: "",
  password: "",
});

const {errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Enter a valid email address eg. johndoe@mail.com').required('email is required to login'),
    password: yup.string().min(8).required('password is required to login'),
  }),
});

const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values, null, 2));

});

const email = defineInputBinds('email');
const password = defineInputBinds('password');




async function login() {

try{
  // userStore.create_user = 

  userStore.login_user.email = user_login.email
  userStore.login_user.password = user_login.password

  const res = await userStore.login();

  if(res?.data && res.data.message === 'You have successfully Authenticated'){
    userStore.authenticatedUser.user = res.data.user,
    userStore.authenticatedUser.token = res.data.token,
    console.log(userStore.authenticatedUser.token?.token)



   navigateTo({
    path: '/',
    // query: {
    //   name: name.value,
    //   type: type.value
    // }
  })


  }

}catch(error){
  
  console.log(error);
}
}

</script>
<style>
    
</style>