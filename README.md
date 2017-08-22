
# noderedis
This is an example project showing how to setup a project using NodeJS, Express, Redis, Redis Cluster, TypeScript, Mustache and Gulp.

Caching is a very important aspect of webdevelopment and nearly all high-traffic server applications use caching to be able to reliably serve their content.
This example project is created as part of my research on how to use a clustered Redis in combination with a NodeJS/Express server application. I've also taken the liberty to use TypeScript as my supporting dialect because I like the syntax of exporting/importing modules better than the "Node"-way. And I believe it makes developing monolith applications easier with better IDE support.

# Prerequisites
* TypeScript
* Gulp
* NPM
* NodeJS
* Redis Cache

# Installation
1. Run `npm install` to install all the required dependencies.
1. Copy `src/redis/credentials.example.ts` to `src/redis/credentials.ts`.
1. Edit `src/redis/credentials.ts` so the `host` value points to your own Redis instance.
    1. Optionally if you use a Redis Cluster you can edit `src/redis/redis.ts` and change 
    ```
    //client: redisClustr,
    host: redisCredentials.host,
    ```
    into
    ```
    client: redisClustr,
    //host: redisCredentials.host,
    ```
1. Build the project
    1. Run `gulp` to build the project.
    1. Run `gulp watch` to build the project and keep a watch on the project files and compile them on any changes.
1. Start the server with:
    1. Windows: `npm run devw`
    1. *ux: `npm run dev`

# Usage
* Navigate to `http://localhost:3333` to see the generated webpage (~100KB).
* Navigate to the same page again to see the website served from the Redis cache.
* Navigate to `http://localhost:333/invalidate` to invalidate the Redis cache.

# Conclusion
On a laptop with Core i7-5500U, 8GB Ram, SSD HDD running Windows 10:
- Generating the webpage costs ~40ms to ~50ms.
- Serving the website from a locally installed Redis cache reduces that amount to ~20ms.

On a high-traffic webserver one can make the assumption that generating the website might take longer than ~40ms. And operations like calling other webservices or querying a database will add to that time as well.
