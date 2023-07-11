import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
// import Application from '@ioc:Adonis/Core/Application'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Comment from 'App/Models/Comment'



export default class PostsController {

    public async index({response}:HttpContextContract){

        try{

            const posts = await Post.query()
            .preload('category')
            .preload('user')
            .preload('comments')

            return response.ok({
                message:'Post queried successfully',
                posts: posts
            })

        }catch(error){

            return response.internalServerError({
                message:'Error querying categories',
                error: error.message
            })

        }

    }

    public async store({request, auth, response}:HttpContextContract){

        const validatedData = await request.validate(CreatePostValidator)

        try{

            const post = new Post()
            post.categoryId = validatedData.categoryId,
            post.title = validatedData.title
            post.body = validatedData.body,
            post.userId = auth.user!.id,
            post.image = Attachment.fromFile(validatedData.image)

            await post.save();

            response.created({
                message:'Post created successfully',
                post:post
            })

        }catch(error){
            
            response.internalServerError({
                message:'Failed to create post, please try again',
                error: error.message
            })
        }

    }



    public async update({request, params, response, bouncer}:HttpContextContract){

        const validatedData = await request.validate(UpdatePostValidator)

        try{

            const post = await Post.findBy('id', params.id)

            if(!post){
                return response.notFound({
                    message:`This post with ${params.id} was not found`,
                    post:{}
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('PostPolicy').denies('update', post)){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                    
                })
            }
    
            if(validatedData.image){
                post.image = Attachment.fromFile(validatedData.image)

            }
    
                // the updated the rest of the field
                post.title = validatedData.title
                post.body = validatedData.body,
                post.categoryId = validatedData.categoryId
                    
                await post.save()
                    // return the update post
                    return response.created({
                        message: 'Post updated successfully',
                        post: post
                    })

        }catch(error){

            return response.internalServerError({
                message:'Error updating post',
                error: error.message
            })

        }

    }

    public async showOnePost ({params, response}:HttpContextContract){

        try{

            const post = await Post.findBy('uuid', params.uuid)
            
            if(!post){
                return response.notFound({
                    message:`No post found with this ${params.uuid}`
                })
            }
            

            const user = await User.findBy('id', post.userId)
            const category = await Category.findBy('id', post.categoryId)
            const comments = await Comment.query().where('post_id', post.id)
            .preload('user')
    
    
            return response.ok({
               message:'post found was successfully',
               post:post,
               user:user,
               category:category,
               comments:comments
            })

        }catch(error){

            return response.internalServerError({
                message:'Failed to fetch post',
                error:error.message
            })

        }


    }





    public async destroy ({params, response, bouncer}:HttpContextContract){


        try {

            // try to find the post first
            const post = await Post.findBy('id', params.id);

            if(!post){
                return response.notFound({
                    message:'Could not find post with id'
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('PostPolicy').denies('update', post)){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                    
                })
            }            

            if(!post){
                return response.notFound({
                    message:`This post with ${params.id} was not found`,
                    post:{}
                })
            }

            // delete the post
            await post.delete()

            return response.ok({
                message:'Post deleted successfully',
                post:post
            })

        }catch(error){

            response.internalServerError({
                message: 'Failed to delete post',
                error:error.message
            })
        }

    }
}
