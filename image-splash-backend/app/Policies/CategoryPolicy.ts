import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
// import Category from 'App/Models/Category'

export default class CategoryPolicy extends BasePolicy {

	public async before(user: User | null) {
		if (user && user.roleId === 2) {
		  return true
		}
	  }


	public async create(user: User) {
		return user.roleId === 2
	}
	public async update(user: User) {
		return user.roleId === 2
	}
	public async delete(user: User) {
		return user.roleId === 2
	}
}
