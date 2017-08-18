import * as express from 'express';
import HomeControllerImpl from './home/HomeControllerImpl';
import { redisExpressCache } from "../redis/redis";

declare var __dirname: any;

const controllers = [
    HomeControllerImpl
];

/**
 * Bootstrap all the routes by initializing all the controllers.
 * 
 * @param app Express application
 */
export function initRoutes(app: express.Application) {
    for(let controller of controllers) {
        new controller(app, redisExpressCache(), {
            home: `${__dirname}/home/home.mst`,
            partial: `${__dirname}/home/partial.mst`,
            invalidate: `${__dirname}/home/invalidate.mst`
        });
    }
}
