import { defineStore } from 'pinia'
import axios from 'axios';
import {ref, reactive} from 'vue'
// import type { Ref,  } from 'vue'
import { CreateUser , AuthenticatedUser, Login} from '~/utils/types';


export const useUserStore = defineStore('user', () => {

    

    const create_user = reactive<CreateUser>({
        email: "",
        password:"",
        name:"",
        username: ""
    })

    const login_user = reactive<Login>({
        email:"",
        password: ""
    })

    const authenticatedUser  = reactive<AuthenticatedUser>({
        token: null,
        user: null,
    })


   const  isSignupLoading = ref<boolean>(false)
   const  isLoginLoading = ref<boolean>(false)
   const  isLogoutLoading = ref<boolean>(false)

    const runTimeConfig = useRuntimeConfig()

    const baseUrl:String =  runTimeConfig.public.baseUrl





    // create a user
    async function signup(){

        try{
        // make loadin true
        isSignupLoading.value = true;

        // user data to register
        let formData = new FormData();
        formData.append("username", create_user.username);
        formData.append("name", create_user.name);
        formData.append("email", create_user.email);
        formData.append("password", create_user.password);
        
        // header
        let headers ={
            "Content-Type": "application/json",
            Accept: "application/json",
        }

       const res =  await axios.post(
            `${baseUrl}/api/signup`,
            formData,
            {
                headers: headers
            }
        )

        if(res.data.message === 'User created successfully'){

            const toast = useToast()
        
            toast.add({
              id: 'user_register_success',
              title: ':) Hurray!, You have successfully created an account',
              description: 'Start exploring & sharing high quality images with others creatives',
              timeout: 0,
            })
      
          
            return res; 

                 // make loadin true
        }
        
        isSignupLoading.value = false;


        }catch(error:any){

            isSignupLoading.value = false;

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
            isSignupLoading.value = false;
          }
        
    }

        // create a user
        async function login(){

            try{
            // make loadin true
            isLoginLoading.value = true;
    
            // user data to register
            let formData = new FormData();
            formData.append("email", login_user.email);
            formData.append("password", login_user.password);
            
            // header
            let headers ={
                "Content-Type": "application/json",
                Accept: "application/json",
            }
    
           const res =  await axios.post(
                `${baseUrl}/api/signin`,
                formData,
                {
                    headers: headers
                }
            )

                
            if(res.data && res.data?.message === 'You have successfully Authenticated'){
    
                const toast = useToast()
            
                toast.add({
                  id: 'user_login_success',
                  title: ':) Hurray!, You have successfully logged into your an account',
                  description: 'Start exploring & sharing high quality images with others creatives',
                  timeout: 0,
                })
          
              
                return res; 
    
                     // make loadin true
            }else{

            }
            
            isLoginLoading.value = false;
    
    
            }catch(error:any){
    
                isLoginLoading.value = false;
    
                console.log(error);
    
                const toast = useToast()
    
                if(error.response.data.errors && error.response.data.errors.length > 0){
                    error.response.data.errors.forEach((validated_error: any) => {
                        toast.add({
                            id: 'user_login_failed',
                            title: 'Oops! Failed to aunthenticate user!',
                            description: `${validated_error.message}`,
                            timeout: 0,
                        })
                    });
                }else if(error.response.data){
                    toast.add({
                        id: 'user_login_failed',
                        title: 'Oops! Failed to aunthenticate user!',
                        description: `${error.response.data.message}`,
                        timeout: 0,
                    })
                }
                
                
                else{
                    toast.add({
                        id: 'user_login_success',
                        title: 'Ooops! Failed to create an account',
                        description: `${error.message}`,
                        timeout: 0,
                      })  
                }
    
            }finally{
                isLoginLoading.value = false;
              }
            
        }



        // log
        async function logout(){

            try{
            // make loadin true
            isLogoutLoading.value = true;
    
            
            // header
            const config = {
                headers: { 
                    "Content-Type": "application/json",
                    Accept: "application/json",  
                }
            };
            // let headers ={
            //     Authorization: `Bearer ${authenticatedUser.token?.token}`,
            // }
    
           const res =  await axios.get(
                `${baseUrl}/api/logout`,
                config
            )

                
            if(res.data && res.data?.message === 'Logged out successfully'){
    
                const toast = useToast()
            
                toast.add({
                  id: 'user_logout_success',
                  title: ':) Hurray!, You have successfully logged out your an account',
                  description: 'We will be expecting you soon, have a nice day/night experience',
                  timeout: 0,
                })
          
              
                return res; 
    
                     // make loadin true
            }else{

            }
            
            isLogoutLoading.value = false;
    
    
            }catch(error:any){
    
                isLogoutLoading.value = false;
    
                console.log(error);
    
                const toast = useToast()
    
                if(error.response.data.errors && error.response.data.errors.length > 0){
                    error.response.data.errors.forEach((validated_error: any) => {
                        toast.add({
                            id: 'user_logout_failed',
                            title: 'Oops! Failed to logout out!, please try again',
                            description: `${validated_error.message}`,
                            timeout: 0,
                        })
                    });
                }else if(error.response.data){
                    toast.add({
                        id: 'user_logout_failed',
                        title: 'Oops! Failed to aunthenticate user!, please try again',
                        description: `${error.response.data.message}`,
                        timeout: 0,
                    })
                }
                
                
                else{
                    toast.add({
                        id: 'user_logout_failed',
                        title: 'Oops! Failed to aunthenticate user!, please try again',
                        description: `${error.message}`,
                        timeout: 0,
                      })  
                }
    
            }finally{
                isLogoutLoading.value = false;
              }
            
        }

        

  

    return {
        signup,
        login,
        logout,
        create_user,
        login_user,
        isSignupLoading,
        isLoginLoading,
        isLogoutLoading,
        authenticatedUser
    }

},
    {
        persist:{
            storage: persistedState.sessionStorage,
            key:'user-storage-key',
            paths: ['authenticatedUser.user', 'authenticatedUser.token', 'authenticatedUser.is_authnticated'],
        }
    }
)