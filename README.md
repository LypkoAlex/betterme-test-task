## Api Documentstion

Endpoint: `GET /repositories?name=<string>`
- Accepted query params:
```
name : string // Repo name
page : number // Pagination page number
per_page: number // Number of results on page
order : [ 'desc', 'asc' ] // Order method
sort : ['forks', 'stars', 'updated', 'help-wanted-issues'] // Sort result by...
```
- Required Cookie:
```
AUTH_TOKEN: <JWT_TOKEN>
```
- Request example:
```bash
curl --location --request GET 'localhost:3000/repositories?name=nestjs' \
--header 'Cookie: AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.2clllx6-NcqpYF0Tk9Zt9mQQivp7gHBH55zyEtz-4dA'
```
## Installation

```bash
$ npm install
```

## Run Redis

```
$ sudo docker run --name better-redis -p 6379:6379 redis
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```