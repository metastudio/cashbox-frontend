This is frontend application. You need working backend application for it.
You may get it here https://github.com/metastudio/cashbox

# Get started

## Install packages

```sh
$ yarn install
```

## Make configuration

Copy `.env.sample` to `.env.local` and edit this file.

## Run development server

```sh
$ yarn start
```

## ESLint

To make ESLint work you have to install additional packages globally:

```sh
$ npm install -g eslint-config-react-app babel-eslint@^7.2.3 eslint@^4.1.1 eslint-plugin-flowtype@^2.34.1 eslint-plugin-import@^2.6.0 eslint-plugin-jsx-a11y@^5.1.1 eslint-plugin-react@^7.1.0
```

## TSLint

Should work out of the box.

# Deployment

Heroku is used for deployment. `rscashbox` - is application for staging
and `rcashbox` - for production.

1. Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. Login to heroku:
   ```sh
   $ heroku login
   ```

## Deploy to staging

Use `master` branch to deploy to staging:

1. Add configured heroku application:
   ```sh
   $ heroku git:remote -a rscashbox -r heroku-staging
   ```
2. Make sure that environment variables are set:
   ```sh
   $ heroku config -r heroku-staging
   ```
   Output should looks something like this:
   ```
   === rscashbox Config Vars
   REACT_APP_BACKEND_HOSTNAME: staging.cashbox.metastudiohq.com
   REACT_APP_BACKEND_PORT:     443
   REACT_APP_BACKEND_PROTOCOL: https
   REACT_APP_COOKIES_KEY:      cashbox_frontend_staging
   ```
   Set a new env variable if required (see `.env.sample` for list of used variables):
   ```sh
   $ heroku config:set -r heroku-staging VARIABLE=value
   ```
3. Deploy:
   ```sh
   $ git push heroku-staging master
   ```

## Deploy on production:

Use `production` branch to deploy to production.

1. Add configured heroku application:
   ```sh
   $ heroku git:remote -a rcashbox -r heroku-production
   ```
2. Make sure that environment variables are set:
   ```sh
   $ heroku config -r heroku-production
   ```
   Output should looks something like this:
   ```
   === rcashbox Config Vars
   REACT_APP_BACKEND_HOSTNAME: cashbox.metastudiohq.com
   REACT_APP_BACKEND_PORT:     443
   REACT_APP_BACKEND_PROTOCOL: https
   REACT_APP_COOKIES_KEY:      cashbox_frontend
   ```
   Set a new env variable if required (see `.env.sample` for list of used variables):
   ```sh
   $ heroku config:set -r heroku-production VARIABLE=value
   ```
3. Deploy:
   ```sh
   $ git push heroku-production master
   ```
