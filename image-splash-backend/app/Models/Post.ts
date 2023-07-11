import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ManyToMany, beforeSave, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Category from './Category';
import Collection from './Collection';
import { v4 as uuidv4 } from 'uuid';
import {attachment, AttachmentContract} from '@ioc:Adonis/Addons/AttachmentAdvanced'
import User from './User';
import Comment from './Comment';


export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public userId: number

  @column()
  public categoryId: number

  @column()
  public collectionId: number

  @column()
  public title: string | undefined

  @column()
  public body: string | undefined


  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string



  @attachment({folder: 'posts', preComputeUrl: true})
  public image: AttachmentContract | null

  @column()
  public viewCount: string

  @column()
  public viewCountUnique: string

  @column()
  public postedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  @belongsTo(() => Collection)
  public collection: BelongsTo<typeof Collection>

  @beforeSave()
  public static async createUUID(collection: Collection){
    collection.uuid = await uuidv4();
  }

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>


  
  @manyToMany(() => Collection, { 
    pivotTable: 'user_post_collections',
    pivotTimestamps: true
  })
  public user_post_collections: ManyToMany<typeof Collection>

 
}
