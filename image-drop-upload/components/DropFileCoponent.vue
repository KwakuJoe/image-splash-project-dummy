<template>
        <div class="w-full flex flex-col cursor-pointer dark:bg-gray-900 rounded-lg lg:px-10 px-5 py-10">
        <p class="text-center text-lg font-medium">Drop your image</p>
        <p class="text-center text-xs font-light">File uploaded should be jpeg, jpg or png ...</p>

    <form  @submit.prevent="onSubmit">

        <label for="dropzone-file" class="flex my-5 flex-col items-center justify-center  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"> Drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" @change="onFileSelected" class="hidden">
        </label>

        <div v-if="postStore.post_upload.image"  class="px-3 mb-3 w-full rounded-sm gap-x-5 py-2 flex flex-row  bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p class="text-sm">{{ postStore.post_upload.image }}</p>
        </div>

        <div class="flex flex-row justify-between items-end my-2">
            <p class=" text-lg font-medium mt-5">Post Content - optional </p>
        </div>
        <p class=" text-xs font-medium mb-2">You can optional add Title and body to your post to describe the inspiration about your image</p>
        <!-- title and body form -->

            <div class=" flex-col flex gap-y-4 my-5">
                <div class="flex flex-col gap-y-2 w-full">
                    <p class="text-sm font-medium">Title</p>
                    <UInput color="white" v-bind="title" v-model="optional_body.title" class="h-10" placeholder="Title" variant="outline" />
                    <div class="text-sm font-medium text-red-500">{{ errors.title }}</div>
                </div>
                <div class="flex flex-col gap-y-2 w-full">
                    <p class="text-sm font-medium">Description</p>
                    <UTextarea color="white" size="xl" v-model="optional_body.body" v-bind="body" placeholder="Describe your inspiration behind your image" variant="outline" />
                    <div class="text-sm font-medium text-red-500">{{ errors.body }}</div>
                </div>
                <div class="flex flex-col gap-y-2 w-full">
                {{ optional_body.categoryId }}
                    <p class="text-sm font-medium">Select Category</p>
                    <select id="small" v-bind="category" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option class="p-10" v-for="(category, index) in categoryList" :key="index" :value="category.id">{{ category.name }}</option>
                    </select>    
                    <div class="text-sm font-medium text-red-500">{{ errors.category }}</div>
                </div>

            </div>
                
            
            <div class="flex flex-col gap-y-4">
                 <!-- <button type="button" >Upload</button> -->
                <UButton v-if="postStore.ispostLoading" class="mx-10 h-10 flex align-middle justify-center" loading />
                <UButton  v-else icon="i-heroicons-check-circle" @click="onSubmit" type="submit"  class=" h-10 flex align-middle justify-center" label="Button" />
            </div>
        </form>
    
            
    </div>
    



</template>

<script setup >
import { ref} from 'vue'
import { usePostStore } from '~/stores/post_store';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

// comment prop
const props = defineProps({categories: Object})
const postStore = usePostStore()






// my code
const onFileSelected = (event) => {
  if (event.target.files && event.target.files[0]) {
    console.log(event.target.files[0])
    postStore.post_upload.image = event.target.files[0]
    console.log(postStore.post_upload.image)

//     productDetails.image = event.target.files[0];
//     let reader = new FileReader();
//     reader.onload = (event) => {
//       productDetails.image_view = event.target.result;
//     };
//     reader.readAsDataURL(event.target.files[0]);
  }
}




// validation of optional field
const { errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    category: yup.string().required(),
  }),
});

const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values.category));

    postStore.post_upload.body = values.title
    postStore.post_upload.title = values.body
    postStore.post_upload.categoryId = values.category
  uploadTheFile();
});

const title = defineInputBinds('title');
const body = defineInputBinds('body');
const category = defineInputBinds('category');


// category 


// upload post
async function uploadTheFile() {

try{



    const res = await postStore.uploadPost()

  if(res?.data.message === 'Post created successfully'){
    console.log(res.data)
  }

}catch(error){
  
  console.log(error);
    }
}



const categoryList = props.categories;

//   createuser
const optional_body = reactive({
  title: "",
  body: "",
  categoryId:categoryList[0].name
});










// toggle forms
const isFormVisible = ref(false)

function toggleFormVisibility(){

    isFormVisible.value = !isFormVisible.value;
}
</script>