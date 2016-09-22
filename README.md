This is frontend application. You need working backend application for it.
You may get it here https://github.com/metastudio/cashbox

# Get started

## Install packages

```sh
$ npm install
```

## Make configuration

Copy `config/default.yml.sample` to `config/default.yml` and edit this file.

## Run development server

```sh
$ npm start
```

## ESLint

To make checking with [eslint](http://eslint.org) use command:

```
npm run eslint
```

# Deploy to staging

Make sure you have `config/staging.yml` file and it have proper values

Install `shipit` and `shipit-deploy` gem globally:

```
npm install shipit shipit-deploy --global
```

Run deploy command from project folder (config files is searched related to current folder)

```
shipit staging deploy
```
