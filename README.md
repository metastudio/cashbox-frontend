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

Heroku is used for deployment. `rscashbox` - is application for staging.

1. Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. Login to heroku:
   ```sh
   $ heroku login
   ```
3. Add configured heroku application to your local:
   ```sh
   $ heroku git:remote -a rscashbox
   ```
4. Make sure that environment variables are set:
   ```
   $ heroku config
   ```
   And set any new if required (see `.env.sample` for list of variables):
   ```sh
   $ heroku config:set VARIABLE=value
   ```
5. Deploy:
   ```sh
   $ git push heroku master
   ```
