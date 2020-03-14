import {Request, Response} from "express";
import {RTSPModel} from '../models/RTSPModel';

class RTSPController {
    /* Get all RTSP urls associated with the user */
    async getUserRTSPUrls(req: any, res: Response) {
        try {
            const urls = await RTSPModel.find({userId: req.user._id});
            res.status(200).send({result: urls});
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    /* Insert a new RTSP url and bind it to a specific user */
    async insertUserRTSPUrl(req: any, res: Response) {
        const {url} = req.body;
        try {
            const rtsp = new RTSPModel({userId: req.user._id, url: url});
            await rtsp.save();
            res.status(200).send({message: 'Url is saved successfully'});
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default RTSPController;