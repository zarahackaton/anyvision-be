import {Request, Response} from "express";
import {RTSPModel} from '../models/RTSPModel';

class RTSPController {
    /* Checks whether the movement is valid or not */
    async getUserRTSPUrls(req: any, res: Response) {
        // const {userId} = req.params;
        console.log(req.user);
        try {
            const urls = await RTSPModel.find({userId: req.user._id});
            console.log(urls);
            res.status(200).send({result: urls});
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async insertUserRTSPUrl(req: any, res: Response) {
        const {url} = req.body;
        console.log(req.user);
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