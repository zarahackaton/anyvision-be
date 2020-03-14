import {Application} from 'express';
import RTSPController from '../controllers/RTSPController';
import {authenticateToken} from '../middlewares';

class RTSPRoutes {
    public rtspController: RTSPController;

    constructor() {
        this.rtspController = new RTSPController();
    }

    public routes(app: Application): void {
        app.route('/rtsp')
            .get(authenticateToken, this.rtspController.getUserRTSPUrls);
        app.route('/rtsp')
            .post(authenticateToken, this.rtspController.insertUserRTSPUrl);
    }
}

export default RTSPRoutes;