# ems_app

> EMS App

## Build and run this app in a docker container

> Build the docker image and along with the app:
```bash
$ docker build -t ems/app .
```
Now `ems_app/dist` directory contains all the published files to be served over http.

> Run the app in docker image itself:
```bash
$ docker run -it -p 8080:8080 --rm --name ems-app ems/app
```
We should be able to access our Vue.js app on [localhost:8080](http://localhost:8080)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
