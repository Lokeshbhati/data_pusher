import express from 'express';
import DataPusherController from '../controllers/dataPusher.js';
const dataPusherRouter = express.Router();

dataPusherRouter.post('/',DataPusherController.pushIncomingData);

export default dataPusherRouter;