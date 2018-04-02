# Showcase for cacheControl bug in Apollo Server

The purpose of this repo is to showcase a bug (?) in the Apollo GraphQL stack, when combining `mergeSchemas`, and dynamic cache hints through `info.cacheControl` in a resolver.

## Problem

`info.cacheControl` is not passed to resolvers when using `mergeSchemas`.

## How to reproduce

- Clone this repo
- run `yarn`
- run `yarn nodemon index.js`
- observe that without `mergeSchemas`, an object is passed for `info.cacheControl`
- switch to using `mergeSchemas`. (toggle line 40 and 41 in `index.js`)
- observe that with `mergeSchemas`, `info.cacheControl` logs as `undefined`