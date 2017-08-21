# noderedis
This is an example project showing how to setup a project using NodeJS, Express, Redis, Redis Cluster, TypeScript and Gulp.

Caching is a very important aspect of webdevelopment and nearly all high-traffic server applications use caching to be able to reliably serve their content.
This example project is created as part of my research on how to use a clustered Redis in combination with a NodeJS/Express server application. I've also taken the liberty to use TypeScript as my supporting dialect because I like the syntax of exporting/importing modules better than the "Node"-way. And I believe it makes developing monolith applications easier with better IDE support.

# Prerequisites
* TypeScript
* Gulp
* NPM
* NodeJS

# Installation
1. Run `npm install` to install all the required dependencies.
1. Build the project
    1. Run `gulp build` to build the project.
    1. Run `gulp watch` to build the project and keep a watch on the project files and compile them on any changes.
1. Start the server with:
    1. Windows: `npm run devw`
    1. *ux: `npm run dev`
