import * as express from 'express';
import {initRoutes} from './components/bootstrap';

const app: express.Application = express();
const port: number = 3333;

initRoutes(app);

app.listen(port, () => {
    console.info(`Example app listening on port ${port}`);
});