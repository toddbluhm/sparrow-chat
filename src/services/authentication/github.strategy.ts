import { Sequelize } from 'sequelize'
import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth'
import { Params } from '@feathersjs/feathers'
import { UserData } from '../users/users.class'

export class GitHubStrategy extends OAuthStrategy {
  async getEntityData (profile: OAuthProfile & { avatar_url?: string }, existing: any, params: Params
  ): Promise<{ [p: string]: any, email: string, avatar?: string }> {
    const { githubId } = await super.getEntityData(profile, existing, params)

    return {
      socialMediaConnections: Sequelize.literal(
        `"socialMediaConnections" || '${JSON.stringify({ githubId })}'`
      ),
      email: profile.email,
      avatar: profile.avatar_url
    }
  }

  getEntityQuery (profile: OAuthProfile & { email?: string }, _params: Params): any {
    let githubId = profile.id
    if (githubId == null || githubId === '') {
      return
    }
    githubId = githubId.toString()
    return {
      $limit: 1,
      $or: [
        { 'socialMediaConnections.githubId': githubId },
        { 'socialMediaConnections.githubId': null, email: profile.email }
      ]
    }
  }

  async updateEntity (
    entity: any, profile: OAuthProfile, params: Params
  ): Promise<UserData> {
    const id: number = entity[this.entityId]
    const data = await this.getEntityData(profile, entity, params)

    // Get the avatar
    const { avatar } = data
    delete data.avatar

    // Update everything but the avatar
    let res = await this.entityService.patch(id, data, params)

    // If we have a valid avatar then attempt to update that
    if (avatar != null && avatar !== '') {
      try {
        const res2 = await this.entityService.patch(
          id,
          { avatar },
          {
            query: {
              $limit: 1,
              $or: [
                { avatar: '' },
                { avatar: null }
              ]
            }
          })
        res = { ...res, ...res2 }
      } catch (e) {
        if (/no record found/gi.test(e.message)) {
          // Failure to patch is okay, just means an avatar already exists
          return res
        }
        throw e
      }
    }
    return res
  }
}
