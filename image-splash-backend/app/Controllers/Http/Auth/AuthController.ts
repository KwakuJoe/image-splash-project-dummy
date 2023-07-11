import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInValidator from 'App/Validators/SignInValidator';
import SignupValidator from 'App/Validators/SignupValidator'
// import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash'
import Post from 'App/Models/Post';


export default class AuthController {

    public async signup({auth, response, request}: HttpContextContract){
        
        const validatedData = await request.validate(SignupValidator)

        try{

            const user = await User.create({
                // uuid: uuidv4(),
                name: validatedData.name,
                email: validatedData.email,
                username: validatedData.username,
                password: validatedData.password,
                roleId:1
            })

            const token = await auth.use('api').generate(user)

            return response.created({
                 message:'User created successfully',
                 user: user,
                 token: token
            })
    
        }catch(error){

            return response.internalServerError({
                error: error.message,
                message:'Failed to create user, please try again',
                user: {},
                token:{}
            })
        }


        // response.badRequest({ error: 'Invalid login credentials' })
        // response.forbidden({ error: 'Unauthorized' })
        // response.created({ data: user })
    }

    public async signin({auth, request, response}:HttpContextContract){

        const validatedData = await request.validate(SignInValidator)
        const user  = await User.findBy('email', validatedData.email)

        try{

            if(!user){
                return response.notFound({
                    message:'User with email is does not exist in our database',
                    user:{}
                })
            }
    
            const passwordVerified = await Hash.verify(user?.password, validatedData.password)
    
            if(!passwordVerified){
                return response.unauthorized({
                    message:'Invalid Credentials, Please check credentials and try again !'
                })
            }
    
            const token = await auth.use('api').generate(user)
    
            return response.ok({
                message:'You have successfully Authenticated',
                token: token,
                user:user
            })
    

        }catch(error){

            response.internalServerError({
                message:'Authentication failed',
                error:error.message,
                user:{},
                token:{}
            })
        }



    }


    public async signout({auth, response}:HttpContextContract){
        try{

            await auth.logout()

            response.ok({
                message:'Logged out successfully',
            })

        }catch(error){
            return response.internalServerError({
                error: error.message,
                message:'Failed to log out, please try again',
            })
        }

    }

    public async getOneUserProfile ({params, response}:HttpContextContract){

        try{

            const user = await User.findBy('username', params.username)

            if(!user){
                return response.notFound({
                    message:'User not found',
                })
            }

            const posts = await Post.query().where('user_id', user?.id)
            .preload('comments')
            .preload('category')
            .preload('collection')
            .preload('user')
            
    
            return response.ok({
               message:'post found was successfully',
               posts:posts,
               user:user
            })

        }catch(error){

            return response.internalServerError({
                message:'Failed to fetch profile',
                error:error.message
            })

        }


    }

}
