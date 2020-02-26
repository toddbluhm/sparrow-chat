import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth'
import { Params } from '@feathersjs/feathers'

export class GitHubStrategy extends OAuthStrategy {
  async getEntityData (profile: OAuthProfile & { avatar_url?: string }, existing: any, params: Params
  ): Promise<{ [p: string]: any, email: string, avatar?: string }> {
    const baseData = await super.getEntityData(profile, existing, params)

    return {
      ...baseData,
      email: profile.email,
      avatar: profile.avatar_url
    }
  }

  getEntityQuery (profile: OAuthProfile & { email?: string }, _params: Params): any {
    const githubId = profile.id
    if (githubId == null || githubId === '') {
      return
    }
    return {
      $limit: 1,
      $or: [
        { githubId },
        { githubId: { $exists: false }, email: profile.email }
      ]
    }
  }

  async updateEntity (entity: any, profile: OAuthProfile, params: Params): Promise<any> {
    const id: number = entity[this.entityId]
    const data = await this.getEntityData(profile, entity, params)

    // Get the avatar
    const { avatar } = data
    delete data.avatar

    // Update everything but the avatar
    await this.entityService.patch(id, data, params)

    // If we have a valid avatar then attempt to update that
    if (avatar != null && avatar !== '') {
      await this.entityService.patch(
        id,
        { avatar },
        {
          query: {
            $limit: 1,
            $or: [
              { avatar: '' },
              { avatar: { $exists: false } }
            ]
          }
        })
    }
  }
}
