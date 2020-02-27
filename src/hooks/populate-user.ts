// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'

export default (): Hook => {
  return async (context: HookContext): Promise<HookContext | void> => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context
    // Function that adds the user to a single message object
    const addUser = async (message: any): Promise<any | undefined> => {
      // Get the user based on their id, pass the `params` along so
      // that we get a safe version of the user data
      try {
        const user = await app.service('users').get(message.userId, params)

        // Merge the message content to include the `user` object
        return {
          ...message,
          user
        }
      } catch (e) {
        if (/no record found/gi.test(e.message)) {
          // No user found for this message so just ignore the message
          return
        }
        throw e
      }
    }

    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addUser))
      context.result.data = context.result.data.filter((v: any | undefined) => v != null)
    } else {
      // Otherwise just update the single result
      context.result = await addUser(result)
    }

    return context
  }
}
