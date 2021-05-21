# Simple Express + React + Webpack Template (in Typescript!)

This is a simple Express + React (+ Emotion JS for styling) + webpack template.

## How to...

### Install requirements?

```
yarn
```

### Start a development server?

```
yarn watch
```

Then visit `http://localhost:3000` to see the homepage. It'll autoreload the server and rebuild assets when you change stuff. It'll automatically refresh the page once you write changes.

### Build files?

```
yarn build
```

It'll put frontend assets into `./build/prod/frontend`

The api server will be transpiled from typescript into JS and put in `./build/prod/api`

Ideally, this is then served by a webserver like nginx.

## Other Goodies

### Deploy this with Docker
Run the following to deploy this with docker:

```
yarn build
yarn docker:up
```

(You'll need `docker` and `docker-compose` installed)

Then, goto `http://localhost` to see it deployed!

Check out the `pipeline` folder for the Dockerfiles and what not.

### How is the docker deployment laid out?

- It uses `docker-compose` to start 2 services, `frontend` and `apiserver`.
- The `frontend` service is a nginx server that serves the static files in react, and then reverse proxies all other requests to `apiserver`.
- The `apiserver` service runs node and the api service code from `./build/prod/api/app.js`

## Other Notes

- This contains no "tests" or test files, as it is just a simple starter pack (mostly for my own purposes).
