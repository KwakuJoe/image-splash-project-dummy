import { defineStore } from 'pinia'
import axios from 'axios';
import { useUserStore } from './user';
import { UploadPost } from '~/utils/types';

export const usePostStore = defineStore('posts', () => {

        const  ispostLoading = ref<boolean>(false)
        const isLikeLoading = ref<boolean>(false)
        const post_upload = reactive<UploadPost>({
                title: null,
                body: null,
                categoryId: null,
                image: null
        })

        // for liking post

        const postId = ref<Number | null>(null)





   

        async function uploadPost(){

            const runTimeConfig = useRuntimeConfig()
            const baseUrl:String =  runTimeConfig.public.baseUrl

            // accessing user store cos it contains token
            const userStore = useUserStore();
            const token = userStore.authenticatedUser.token?.token
            const userId = userStore.authenticatedUser.user?.id

            try{
            
                    ispostLoading.value = true;

                    // header
                    let headers ={
                        'Content-Type': 'multipart/form-data',
                        Accept: "application/json",
                        "Authorization": `Bearer ${token}`
                    }

                    // post body
                    
                    let formData = new FormData();
                    formData.append("title", post_upload.title as any);
                    formData.append("body", post_upload.body as any);
                    formData.append("categoryId", 1 as any);
                    formData.append("image", post_upload.image as any);
                    formData.append("userId", userId as any);

                    const res =  await axios.post( `${baseUrl}/api/posts`,
                        formData,
                        {
                            headers: headers
                        }
                    )
            
                    if(res.data.message === 'Post created successfully'){
            
                        const toast = useToast()
                    
                        toast.add({
                        id: 'user_register_success',
                        title: ':) Hurray!, You have successfully created an account',
                        description: 'Start exploring & sharing high quality images with others creatives',
                        timeout: 0,
                        })
                        
                    ispostLoading.value = false;

                    
                        return res; 
    
                     // make loadin true
            }
            
            ispostLoading.value = false;;
    
    
            }catch(error:any){
    
                ispostLoading.value = false;
    
                console.log(error);
    
                const toast = useToast()
    
                if(error.response.data.errors && error.response.data.errors.length > 0){
                    error.response.data.errors.forEach((validated_error: any) => {
                        toast.add({
                            id: 'user_register_failed',
                            title: 'Oops! Failed to register user!',
                            description: `${validated_error.message}`,
                            timeout: 0,
                        })
                    });
                }else{
                    toast.add({
                        id: 'user_register_success',
                        title: 'Ooops! Failed to create an account',
                        description: `${error.message}`,
                        timeout: 0,
                      })  
                }
    
            }finally{
                ispostLoading.value = false;
              }
            
        }


        async function likePost(){

            const runTimeConfig = useRuntimeConfig()
            const baseUrl:String =  runTimeConfig.public.baseUrl

            // accessing user store cos it contains token
            const userStore = useUserStore();
            const token = userStore.authenticatedUser.token?.token
            const userId = userStore.authenticatedUser.user?.id

            try{
            
                isLikeLoading.value = true;

                    // header
                    let headers ={
                        // 'Content-Type': 'multipart/form-data',
                        Accept: "application/json",
                        "Authorization": `Bearer ${token}`
                    }

                    // post body
                    
                    let formData = new FormData();
                    formData.append("userId", userId as any);

                    const res =  await axios.post( `${baseUrl}/api/post/${postId.value}/like`,
                        formData,
                        {
                            headers: headers
                        }
                    )
            
                    if(res.data.message === 'post liked successfully'){
            
                        const toast = useToast()
                    
                        toast.add({
                        id: 'post_like_success',
                        title: ':) Hurray!, You have successfully liked a post',
                        description: 'Like more pictures, get access to them in your account profile',
                        timeout: 0,
                        })
                        
                        isLikeLoading.value = false;

                    
                        return res; 
    
                     // make loadin true
            }
            
            isLikeLoading.value = false;;
    
    
            }catch(error:any){
    
                isLikeLoading.value = false;
    
                console.log(error);
    
                const toast = useToast()
    
                if(error.response.data.errors && error.response.data.errors.length > 0){
                    error.response.data.errors.forEach((validated_error: any) => {
                        toast.add({
                            id: 'user_liked_failed',
                            title: 'Oops! Failed to like post',
                            description: `${validated_error.message}`,
                            timeout: 0,
                        })
                    });
                }else{
                    toast.add({
                        id: 'user_liked_failed',
                        title: 'Oops! Failed to like post',
                        description: `${error.message}`,
                        timeout: 0,
                      })  
                }
    
            }finally{
                isLikeLoading.value = false;
              }
            
        }


        return {
            // uploading post var & functions
            post_upload,
            uploadPost,
            ispostLoading,
            // liking post var & functions
            likePost,
            isLikeLoading,
            postId
        }
    
})