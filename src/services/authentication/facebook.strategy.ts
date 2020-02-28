import axios from 'axios'
import { Sequelize } from 'sequelize'
import { Params } from '@feathersjs/feathers'
import { AuthenticationRequest } from '@feathersjs/authentication'
import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth'
import { UserData } from '../users/users.class'

export class FacebookStrategy extends OAuthStrategy {
  async getProfile (authResult: AuthenticationRequest & { access_token: string }, _params: Params): Promise<any> {
    const headers = {
      authorization: `Bearer ${authResult.access_token}`
    }
    // Retrieve the facebook id and email address
    let { data } = await axios.get('https://graph.facebook.com/me', {
      headers,
      params: {
        fields: 'id,email'
      }
    })

    // Retrieve the public profile picture
    const { data: { data: pictureData } } = await axios.get('https://graph.facebook.com/me/picture', {
      headers,
      params: {
        redirect: 0,
        type: 'normal'
      }
    })

    // Only use the profile pic if it is not the default silhouette
    if (pictureData.is_silhouette === false) {
      data = { ...data, profile_pic: pictureData.url }
    }
    return data
  }

  async getEntityData (profile: OAuthProfile & { profile_pic?: string }, existing: any, params: Params
  ): Promise<{ [p: string]: any, email: string, avatar?: string }> {
    const { facebookId } = await super.getEntityData(profile, existing, params)

    return {
      socialMediaConnections: Sequelize.literal(
        `"socialMediaConnections" || '${JSON.stringify({ facebookId })}'`
      ),
      email: profile.email,
      avatar: profile.profile_pic
    }
  }

  getEntityQuery (profile: OAuthProfile & { email?: string }, _params: Params): any {
    let facebookId = profile.id
    if (facebookId == null || facebookId === '') {
      return
    }
    facebookId = facebookId.toString()
    return {
      $limit: 1,
      $or: [
        { 'socialMediaConnections.facebookId': facebookId },
        { 'socialMediaConnections.facebookId': null, email: profile.email }
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
