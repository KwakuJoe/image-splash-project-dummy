
import { defineStore } from 'pinia'
import { useUserStore } from './user';
import { Comment } from '~/utils/types';
import axios from 'axios';


export const useCommentStore = defineStore('comments', () => {


    const  isCommentLoading = ref<boolean>(false)
    const comment = reactive<Comment>({
        content:null,
        postId:null,
    })


    async function createComment(){

        const runTimeConfig = useRuntimeConfig()
        const baseUrl:String =  runTimeConfig.public.baseUrl

        // accessing user store cos it contains token
        const userStore = useUserStore();
        const token = userStore.authenticatedUser.token?.token
        const userId = userStore.authenticatedUser.user?.id

        try{
        
                isCommentLoading.value = true;

                // header
                let headers ={
                    'Content-Type': 'multipart/form-data',
                    Accept: "application/json",
                    "Authorization": `Bearer ${token}`
                }

                // post body
                
                let formData = new FormData();
                formData.append("postId", comment.postId as any);
                formData.append("userId", userId as any);
                formData.append("content", comment.content as any);

                const res =  await axios.post( `${baseUrl}/api/comments`,
                    formData,
                    {
                        headers: headers
                    }
                )
        
                if(res.data.message === 'Comment created successfully'){
                    
                    const toast = useToast()
                
                    toast.add({
                    id: 'comment_created_success',
                    title: ':) Hurray!, You have commented on the post',
                    description: 'Share your ideas, and motivation',
                    timeout: 0,
                    })
                    
                isCommentLoading.value = false;

                
                    return res; 

                 // make loadin true
        }
        
        isCommentLoading.value = false;;


        }catch(error:any){

            isCommentLoading.value = false;

            console.log(error);

            const toast = useToast()

            if(error.response.data.errors && error.response.data.errors.length > 0){
                error.response.data.errors.forEach((validated_error: any) => {
                    toast.add({
                        id: 'user_comment_failed',
                        title: 'Oops! Failed to cooment post',
                        description: `${validated_error.message}`,
                        timeout: 0,
                    })
                });
            }else{
                toast.add({
                    id: 'comment_failed',   
                    title: 'Oops! Failed to cooment post',
                    description: `${error.message}`,
                    timeout: 0,
                  })  
            }

        }finally{
            isCommentLoading.value = false;
          }
        
    }

    return {
        comment,
        createComment,
        isCommentLoading
    }

})