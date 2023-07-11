import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
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

    // uuid:schema.string(),
    username:schema.string([
      rules.unique({table:'users', column:'username'}),
    ]),
    name:schema.string(),
    email:schema.string([
      rules.email(),
      rules.unique({table:'users', column:'email'}),
    ]),
    password:schema.string([
      rules.minLength(8)
    ])
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
    'email.unique':'Email is already being used by another user, please try again.',
    'username.unique':'Username is already being used by another user, please try again.',
    'required':'This {{field}} is required to sign up',
    'password.minLength': 'Password filed required at least 8 character long',
    'email.email': 'This requires a valid email address eg. john@example.com'
  }
}
