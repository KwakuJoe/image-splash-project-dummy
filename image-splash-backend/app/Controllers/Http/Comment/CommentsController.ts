import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'

export default class CommentsController {


    public async store({ response, request}:HttpContextContract){

        const validatedData = await request.validate(CreateCommentValidator)

        try{


    
            const comment = await Comment.create({
                postId:validatedData.postId,
                userId: validatedData.userId,
                content: validatedData.content
            })
    
            return response.created({
                message:'Comment created successfully',
                comment: comment,
            })

        }catch(error){

            return response.internalServerError({
                message:'Error creating comment',
                error: error.message,
            })

        }

    }


    


}
