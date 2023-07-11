import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid').notNullable().unique(),
      table.string('email', 255).notNullable().unique()
      table.string('username', 255).nullable().unique()
      table.string('name', 255).notNullable()
      table.text('bio').nullable().defaultTo('')
      table.string('avatar').nullable().defaultTo('')
      table.text('location').nullable().defaultTo('')
      table.text('website').nullable().defaultTo('')
      table.text('twitter_url').nullable().defaultTo('')
      table.text('facebook_url').nullable().defaultTo('')
      table.text('linkedin_url').nullable().defaultTo('')
      table.integer('role_id', 255).unsigned().defaultTo(1)
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
