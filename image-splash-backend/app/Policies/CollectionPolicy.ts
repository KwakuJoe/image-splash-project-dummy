import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Collection from 'App/Models/Collection'

export default class CollectionPolicy extends BasePolicy {

	public async before(user: User | null) {
		if (user && user.roleId === 2) {
		  return true
		}
	  }

	public async update(user: User, collection: Collection) {
		return collection.userId === user.id
	}
	public async delete(user: User, collection: Collection) {
		return collection.userId === user.id
	}
}
