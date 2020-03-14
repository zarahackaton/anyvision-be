import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors, {CorsOptions} from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoutes from './routes/userRoutes';
import RTSPRoutes from './routes/RTSPRoutes';

class App {
    public app: Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public rtspRoutes: RTSPRoutes = new RTSPRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.userRoutes.routes(this.app);
        this.rtspRoutes.routes(this.app);
    }

    private config() {
        /* Allow requests coming from the Client */
        const options: CorsOptions = {
            origin: 'http://localhost:3000'
        };
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors(options));
        this.app.use(morgan('dev'));
        dotenv.config({path: `${__dirname}/../.env`});
        this.initalizeDBConnetion();
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send('Service is up!');
        });
    }

    private initalizeDBConnetion() {
        const mongoURL = `mongodb://localhost:27017/Anyvision`;
        mongoose.connect(mongoURL, {useNewUrlParser: true});
    }
}

export default new App().app;