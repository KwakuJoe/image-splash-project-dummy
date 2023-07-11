<template >
<section class="py-8 lg:py-5">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
    </div>
    <form @submit.prevent="onSubmit" class="mb-6">

        <label for="comment" class="sr-only">Your comment</label>
        <UTextarea placeholder="Your comment"  v-bind="content" color="gray" variant="outline" />
        <div class="text-sm font-medium text-red-500 my-2">{{ errors.content }}</div>
        <UButton  label="Comment" :loading="commentStore.isCommentLoading" @click="onSubmit()" class="h-10" block />
    </form>
    <article v-for="comment in post.post.comments" class="py-5 px-5 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough">Michael Gough</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
            </div>
            <!-- Three dot suppose to be here -->
        </footer>
        <p class="text-gray-500 dark:text-gray-400">{{ comment.content }}</p>

    </article>
  </div>
</section>
</template>
<script setup>
import { useForm } from 'vee-validate';
import {useCommentStore} from '~/stores/comment'
import * as yup from 'yup';

const commentStore = useCommentStore();


    const props = defineProps({post: Object})

    const post = reactive({
        message:null,
        post:null
    }) 
    post.post = props.post



    // validation
    const {errors, handleSubmit,   defineInputBinds } = useForm({
        validationSchema: yup.object({
            content: yup.string().required('content is required to create a comment'),
        }),
    });

    const onSubmit = handleSubmit(values => {
        commentStore.comment.postId = post.post.post.id
        commentStore.comment.content = values.content;
        console.log(JSON.stringify(values, null, 2));

        comment()
    });

    const content = defineInputBinds('content');

    async function comment() {

        try{
     
            const res = await commentStore.createComment();

            if(res?.data && res.data.message === 'Comment created successfully'){

                console.log(res?.data)
            }

        }catch(error){

             console.log(error);

            }
        }
</script>   
<style>
    
</style>