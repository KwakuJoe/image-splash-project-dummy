import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoriesController {

    public async index({response}:HttpContextContract){

        try{

            const categories = await Category.query()

            return response.ok({
                message:'Category queried successfully',
                categories: categories
            })

        }catch(error){

            return response.internalServerError({
                message:'Error querying categories',
                error: error.message
            })

        }
    }

    public async store({request, response, bouncer }:HttpContextContract){

        const validatedData = await request.validate(CreateCategoryValidator)

        try{

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('CategoryPolicy').denies('create')){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                })
            }            

            const category = await Category.create({
                name:validatedData.name,
                description:validatedData.description,
            })
    
            return response.created({
                message: 'Category created successfully',
                category: category
            })

        }catch(error){

            return response.internalServerError({
                message:'Failed to create category',
                error:  error.message
            })

        }

    }


    public async update({request, response, params, bouncer }:HttpContextContract){

        const validatedData = await request.validate(CreateCategoryValidator)

        try{

            const category = await Category.findBy('id', params.id)

            if(!category){
                return response.notFound({
                    message:'Category not found',
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('CategoryPolicy').denies('update')){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                })
            }              


            //  update category
            category.name = validatedData.name,
            category.description = validatedData.description
            await category.save()

            return response.created({
                message:'Category updated successfully',
                category: category
            })


        }catch(error) {

            return response.internalServerError({
                message:'Error updating category',
                error: error.message
            })

        }
    }


    public async destroy ({params, bouncer, response}:HttpContextContract){

        try {

            // try to find the post first
            const category = await Category.findBy('id', params.id);

            if(!category){
                return response.notFound({
                    message:`This category with ${params.id} was not found`,
                    category:{}
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('CategoryPolicy').denies('delete')){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                })
            }       


            // delete the post
            await category?.delete()

            return response.ok({
                message:'category deleted successfully',
                category:category   
            })

        }catch(error){

            response.internalServerError({
                message: 'Failed to delete Categpry',
                error:error.message
            })

        }

    }

}
