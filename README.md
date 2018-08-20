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

## Linting

TSLint is used to lint both JavaScript and TypesScript files. Linting is run
when you start development server or build bundle.

### Visual Studio Code

To use TSLint for JavasSrript files set config `tslint.jsEnable` to `true`.

Add next task to be able to run lint as task in VSCode:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint",
      "type": "npm",
      "script": "lint",
      "problemMatcher": {
        "base": "$tslint5",
        "fileLocation": "relative"
      }
    }
  ]
}
```

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
   NODE_ENV:                   production
   REACT_APP_BACKEND_HOSTNAME: cashbox.metastudiohq.com
   REACT_APP_BACKEND_PORT:     443
   REACT_APP_BACKEND_PROTOCOL: https
   ```
   Set a new env variable if required (see `.env.sample` for list of used variables):
   ```sh
   $ heroku config:set -r heroku-production VARIABLE=value
   ```
3. Deploy:
   ```sh
   $ git push heroku-production production:master
   ```
