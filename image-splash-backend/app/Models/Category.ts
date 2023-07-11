import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';


export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: number

  @column()
  public name: string

  @column()
  public description: string | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async createUUID(category: Category){
    category.uuid = await uuidv4();
  }

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
  

}
