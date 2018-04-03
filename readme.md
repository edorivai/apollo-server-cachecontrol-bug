# Showcase for cacheControl bug in Apollo Server

Issue: https://github.com/apollographql/apollo-server/issues/933

The purpose of this repo is to showcase a bug (?) in the Apollo GraphQL stack, when combining `mergeSchemas`, and dynamic cache hints through `info.cacheControl` in a resolver.

## Problem

`info.cacheControl` is not passed to resolvers when using `mergeSchemas`.

## How to reproduce

- Clone this repo
- run `yarn`
- run `yarn nodemon index.js`
- go to [localhost:3000/graphiql](http://localhost:3000/graphiql?query=%7B%0A%20%20books%20%7B%0A%20%20%20%20title%0A%20%20%20%20author%0A%20%20%7D%0A%7D), and run a query for `books`
- observe that without `mergeSchemas`, an object is passed for `info.cacheControl`
- switch to using `mergeSchemas`. (toggle line 40 and 41 in `index.js`)
- observe that with `mergeSchemas`, `info.cacheControl` logs as `undefined`
