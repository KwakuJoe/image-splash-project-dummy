import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany, beforeSave, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid';
import User from './User'
import Post from './Post'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string  

  @column()
  public userId: number  

  @column()
  public name: string 
  
  @column()
  public description: string | undefined

  @column()
  public isPrivate: boolean  | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> User)
  public user:BelongsTo<typeof User>

  @manyToMany(() => Post, { 
    pivotTable: 'user_post_collections',
    pivotTimestamps: true
  })
  public user_post_collections: ManyToMany<typeof Post>


  @beforeSave()
  public static async createUUID(collection: Collection){
    collection.uuid = await uuidv4();
  }
}
