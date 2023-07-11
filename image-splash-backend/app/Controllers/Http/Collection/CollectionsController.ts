import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collection from 'App/Models/Collection'
import CreateCollectionValidator from 'App/Validators/CreateCollectionValidator'
// import { schema } from '@ioc:Adonis/Core/Validator'
// import Post from 'App/Models/Post'


export default class CollectionsController {

    public async index({response}:HttpContextContract){

        try{
  
            const collections = await Collection.query()
            .preload('user')


            return response.ok({
                message:'Collection queried successfully',
                collections: collections,
            })

        }catch(error){

            return response.internalServerError({
                message:'Error querying collections',
                error: error.message
            })

        }
    }

    public async store({request, response, auth}:HttpContextContract){

        const validatedData = await request.validate(CreateCollectionValidator)

        try{

            const collection = await Collection.create({
                userId: auth.user?.id,
                name:validatedData.name,
                description:validatedData.description,
                isPrivate:validatedData.isPrivate
            })
    
            return response.created({
                message: 'collection created successfully',
                collection: collection
            })

        }catch(error){

            return response.internalServerError({
                message:'Failed to create collection',
                error:  error.message
            })

        }

    }

    public async update({request, response, params }:HttpContextContract){

        const validatedData = await request.validate(CreateCollectionValidator)

        try{

            const collection = await Collection.findBy('id', params.id)

            if(!collection){
                return response.notFound({
                    message:'Collection not found',
                })
            }


            //  update collection
            collection.name = validatedData.name,
            collection.description = validatedData.description,
            collection.isPrivate = validatedData.isPrivate
            await collection.save()

            return response.created({
                message:'Collection updated successfully',
                collection: collection
            })


        }catch(error) {

            return response.internalServerError({
                message:'Error updating collection',
                error: error.message
            })

        }
    }

    // Likin a post
    // public async addToCollection ({params, request, response}:HttpContextContract){
    //     // const userId = request.input('user_id');
    //     // const postid = request.input('post_id');
    //     const ValidateSchema = schema.create({
    //         Collection: schema.number(),
    //       })

    //       const payload = await request.validate({ schema: ValidateSchema })

    //     try{
    //         // find whether we liked it or not
    //         const post = await Post.findBy('id', params.postId)
    //         post?.related('user_post_collections').attach([payload.])

    //         return response.created({
    //             message:'post liked successfully',
    //         })

    //     }catch(error){

    //         return response.internalServerError({
    //             message:'Failed to like post',
    //             error:error.message
    //         })

    //     }


    // }


    public async destroy ({params, response}:HttpContextContract){

        try {
            // try to find the post first
            const collection = await Collection.findBy('id', params.id);

            if(!collection){
                return response.notFound({
                    message:`This Collection with ${params.id} was not found`,
                    collection:{}
                })
            }

            // delete the post
            await collection?.delete()

            return response.ok({
                message:'collection deleted successfully',
                collection:collection   
            })

        }catch(error){

            response.internalServerError({
                message: 'Failed to delete Categpry',
                error:error.message
            })
        }

    }



}
