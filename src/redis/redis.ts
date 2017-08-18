import * as cache from 'express-redis-cache';
import * as RedisClustr from 'redis-clustr';
import {redisCredentials} from './credentials';

declare var __dirname: any;

let redisClustr = new RedisClustr({
    servers: [{
        host: redisCredentials.host
    }]
});

let redis = cache({
    client: redisClustr,
    prefix: 'noderedis',
    expire: 60
});
redis.on('connected', function () {
    console.info('Redis connected');
});
redis.on('disconnected', function () {
    console.info('Redis disconnected');
});
redis.on('message', function (message) {
    console.info(message);
});
redis.on('error', function (error) {
    console.info('Redis error', error);
});

export function redisClient() {
    return redisClustr;
}

export function redisExpressCache() {
    return redis;
}