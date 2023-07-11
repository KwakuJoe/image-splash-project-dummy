import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany, } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import { v4 as uuidv4 } from 'uuid';
import Collection from './Collection'
import Post from './Post';
import Comment from './Comment';


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @column()
  public email: string

  @column()
  public username: string
  
  @column()
  public name: string

  @column()
  public roleId: number

  @column()
  public bio: string

  @column()
  public avatar: string

  @column()
  public location: string

  @column()
  public website: string

  @column()
  public twitterUrl: string

  @column()
  public facebookUrl: string

  @column()
  public linkedinUrl: string
  
  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
	

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async createUUID(user: User){
    user.uuid = await uuidv4();
  }


  // relationships
  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>


  @hasMany(() => Collection)
  public collections: HasMany<typeof Collection>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

}
