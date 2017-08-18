import * as express from 'express';
import * as fs from 'fs-extra';
import * as fetch from 'isomorphic-fetch';
import * as Mustache from 'mustache';
import {Controller} from '../Controller';

declare var __dirname: any;

export default class HomeControllerImpl implements Controller {
    private app: express.Application;
    private redis;
    private templates = {};

    constructor(app: express.Application, redis, templateFiles: {home: string, partial: string, invalidate: string}) {
        console.info('Initialized HomeController');
        this.app = app;
        this.redis = redis;
        this.loadTemplates(templateFiles).then(() => {
            console.info('Templates load done');
            this.initRoutes();
        });
    }

    /**
     * Initialize the routes which should be handled by this controller.
     */
    initRoutes() {
        this.app.get('/', this.redis.route({
            name: 'home',
            expire: {
                "2xx": 60,
                "4xx": 5,
                "5xx": 5,
                "xxx": 1
            }
        }), (req, res) => {
            console.info('GET home');
            let data: {pokemonImage: string, pokemonId: number}[] = [];
            for(let pokemonId = 1; pokemonId <= 802; pokemonId++) {
                data.push({ pokemonImage: `https://www.moviesom.com/img/pokemon/${this.pad(pokemonId, 3)}MS.png`, pokemonId: pokemonId });
            }

            const html = Mustache.render(this.templates['home'], { data: data }, {partial: this.templates['partial']});
            res.send(html);
            /*this.redis.get('home', function (error, entries) {
                if ( error ) throw error;
                entries.forEach(console.log.bind(console));
            });*/
        });

        this.app.get('/invalidate', (req, res) => {
            this.redis.del('home', (error, numDeletions) => {
                if ( error ) throw error;
                const html = Mustache.render(this.templates['invalidate'], {
                    num: numDeletions,
                    route: 'home'
                });
                res.send(html);
            });
        });        
    }

    /**
     * Load Mustache templates from file.
     */
    private loadTemplates(templateFiles: {home: string, partial: string, invalidate: string}) {
        let promises = new Array();
        for(let idx in templateFiles) {
            if(templateFiles.hasOwnProperty(idx)) {
                const templateFile = templateFiles[idx];
                promises.push(fs.readFile(templateFile, 'utf-8')
                .then((result) => {
                    this.templates[idx] = result;
                })
                .catch((error) => {
                    if (error) throw error;
                }));
            }
        }
        return Promise.all(promises);
    }

    private pad(num, size) {
        let s = "000000000" + num;
        return s.substr(s.length-size);
    }
}