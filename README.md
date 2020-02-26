[![Linux Tests](https://github.com/toddbluhm/sparrow-chat/workflows/linux%20tests/badge.svg)](https://github.com/toddbluhm/sparrow-chat/actions?query=workflow%3A%22linux%20tests%22)
[![Windows Tests](https://github.com/toddbluhm/sparrow-chat/workflows/windows%20tests/badge.svg)](https://github.com/toddbluhm/sparrow-chat/actions?query=workflow%3A%22windows%20tests%22)
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

3. Github Authentication (optional): If you plan to enable github authentication you need to create a 
[github oauth app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/). Enter
anything you like for the fields, the only requirement is setting the `Authorization callback URL` to 
`http://localhost:3030/oauth/github/callback`. Next in the root directory, copy or rename `.env-example` to `.env`
and fill in the `GITHUB_*` variables with the appropriate github values from the newly create github oauth app.

4. Start your app:

    ```
    yarn start
    ```

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.
