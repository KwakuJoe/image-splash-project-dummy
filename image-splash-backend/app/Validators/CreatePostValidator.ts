import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title:schema.string.optional({}, [rules.maxLength(255)]),
    categoryId:schema.number(),
    body:schema.string.optional({}),
    image:schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required': 'This {{field}} field is required to create a post',
    'maxLength': 'This {{field}} field cannot exceed 255 characters',
    'image.size': 'The file size must be under {{ options.size }}',
    'image.extname': 'The file must have one of {{ options.extnames }} extension names',
    'exists' :'The {{field}} field does not exist in the categories tables'

  }
}
