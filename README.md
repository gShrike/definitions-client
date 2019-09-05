# Definitions Client

> A reusable client for Definitions API

Built on `create-react-app`

## Setup

Clone down the repo locally and run `npm` or `yarn` install commands

```
npm install
```
```
yarn
```

Create a `.env.local` file and fill in the following information with the path to your Definitions API URL locally.

```
REACT_APP_API_URL=http://localhost:3001
```

If you would like to connect to a production database, you can create a `.env.production` file with the same variables but different domain

## Development

To start development, run the `npm` or `yarn` start command

```
npm start
```
```
yarn start
```

Login is required through Github. To create a Github token for yourself, follow these steps:

1. Login to `https://galvanize-terms-ce05d.firebaseapp.com/` with your Github account
1. In Chrome Dev Tools, go to the Application tab and find the Cookie named `gToken`, copy this value
1. On your local site running at `http://localhost:3000`, open Chrome Dev Tools, go to the Application tab and create or update the Cookie named `gToken` with the copied value

For Admin access, you must be a member of the gShrike team on Github.
