import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class PostPolicy extends BasePolicy {
	// public async viewList(user: User) {}
	// public async view(user: User, post: Post) {}
	// public async create(user: User) {}
	public async before(user: User | null) {
		if (user && user.roleId === 2) {
		  return true
		}
	  }

	public async update(user: User, post: Post) {
		return post.userId === user.id
	}
	
	public async delete(user: User, post: Post) {
		return post.userId === user.id
	}
}
