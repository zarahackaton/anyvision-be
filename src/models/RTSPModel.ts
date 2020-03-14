import mongoose, {Schema} from 'mongoose';

const RTSPSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    url: String
}, {collection: 'RTSP'});

export const RTSPModel = mongoose.model('RTSP', RTSPSchema);