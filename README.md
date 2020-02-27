[![Linux Tests](https://github.com/toddbluhm/sparrow-chat/workflows/linux%20tests/badge.svg)](https://github.com/toddbluhm/sparrow-chat/actions?query=workflow%3A%22linux%20tests%22)
[![Windows Tests](https://github.com/toddbluhm/sparrow-chat/workflows/windows%20tests/badge.svg)](https://github.com/toddbluhm/sparrow-chat/actions?query=workflow%3A%22windows%20tests%22)
[![Coverage Status](https://coveralls.io/repos/github/toddbluhm/sparrow-chat/badge.svg?branch=master)](https://coveralls.io/github/toddbluhm/sparrow-chat?branch=master)
[![TS-Standard - Typescript Standard Style Guide](https://img.shields.io/badge/code%20style-ts--standard-blue.svg)](https://github.com/toddbluhm/ts-standard)

# sparrow-chat

Realtime Chat Application using FeathersJS

## About

Realtime Chat Application using FeathersJS built as a coding test project for Sparrow Marketing.

## Getting Started

Getting up and running is as easy as 1, 2, 3, 4.

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [yarn](https://yarnpkg.com/) installed.

2. Install your dependencies:

    ```
    cd path/to/sparrow-chat
    yarn install
    ```

3. In the root directory, copy or rename `.env-cmdrc.example.json` to `.env-cmdrc.json`
   and fill in any values you wish to use and delete all the code comments in the file.

4. Start your app in dev mode:

    ```
    yarn dev
    ```
   
## Login Methods

- Email/Password (Default): Sign up and login via email and password is enabled by default.

- Github Authentication: If you want to enable github authentication you need to create a 
[github oauth app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/). Enter
anything you like for the fields of the new github oauth app, however, make sure to set the 
`Authorization callback URL` to `http://localhost:3030/oauth/github/callback`. Next you need to add the 
github oauth app key and secret to the `GITHUB_KEY` and `GITHUB_SECRET` fields in the `.env-cmdrc.json` file.

- Facebook Authentication: If you want to enable facebook authentication you need to create a 
[facebook oauth app](https://developers.facebook.com/docs/facebook-login). Next you need to add the 
facebook app ID and secret to the `FACEBOOK_KEY` and `FACEBOOK_SECRET` fields in the `.env-cmdrc.json` file.

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## Production

To start the app in production mode simply run:

    ```
    yarn start
    ```

**NOTE**: Environment variables will need to be set in the environment manually
