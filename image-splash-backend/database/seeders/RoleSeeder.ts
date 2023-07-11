import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'


export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: 'User',
        description:' Regular Authenticated user'
      },
      {
        name: 'Admin',
        description:'Super Admin user user'
      }
    ])
  }
}
