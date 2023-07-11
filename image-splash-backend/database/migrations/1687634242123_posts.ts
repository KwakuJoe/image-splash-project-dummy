import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid').notNullable()
      table.integer('category_id').unsigned()
      table.integer('collection_id').unsigned()
      table.string('title',255).nullable(),
      table.string('slug').notNullable()
      table.integer('user_id').unsigned()
      table.text('body').nullable()
      table.json('image').nullable() // <-- Alter the column definition
      table.integer('view_count').nullable().defaultTo(0)
      table.integer('view_count_unique').nullable().defaultTo(0)
      table.timestamp('posted_at').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }


  
  public async down () {
    this.schema.dropTable(this.tableName)
  }

  
}
