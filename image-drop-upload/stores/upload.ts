import { defineStore } from 'pinia'
import axios from 'axios';
import {ref} from 'vue'
import type { Ref } from 'vue'


export const useUploadStore = defineStore('upload', () => {


  // STATE
  const selectedFile:Ref<String | null> = ref(null)
 const isLoading = ref(false)

 const runTimeConfig = useRuntimeConfig()

 const baseUrl:String =  runTimeConfig.public.baseUrl
//  FUNCTIOS
  async function uploadImage(){

    // console.log(`uploadedFile image ${selectedFile.value}`);
    try{

      isLoading.value = true;

      let formData = new FormData();
      formData.append("csvFileName", selectedFile.value as any);
      formData.append("title", selectedFile.value as any);
      formData.append("userId", selectedFile.value as any);
      formData.append("image", selectedFile.value as any);
      formData.append("categoryId", selectedFile.value as any);

      const response = await axios.post(
      `${baseUrl}/api/image/uploads`,
      formData,
          {
              headers: {
              'Content-Type': 'multipart/form-data'
              }
          }
      )

      console.log(response.data)
      isLoading.value = false;
      const toast = useToast()

      toast.add({
        id: 'update_downloaded',
        title: 'You have successfully uploaded your image',
        description: 'Image as been added to your collections, visit your page to view',
        icon: 'i-heroicons-check-circle',
        timeout: 0,
        actions: [{
          label: 'Restart',
          click: () => {
    
          }
        }]
      })

      return response.data


      }catch(error:any) {
          console.log(error)
          isLoading.value = false;
          const toast = useToast()
          toast.add({
            id: 'update_downloaded',
            title: 'Error uploading image !, please try again',
            description: `${error.message}`,
            ui: { primary:'green'},
            icon: "i-heroicons-check-badge",
            timeout: 0,
          })
      } finally{
        isLoading.value = false;

      }
  }

  return { selectedFile, uploadImage, isLoading }
})