import express from 'express';
import DestinationController from '../controllers/destination.js';
const destinationRouter = express.Router();

destinationRouter.get('/',DestinationController.getDestination);
destinationRouter.get('/:id',DestinationController.getDestinationById);
destinationRouter.post('/',DestinationController.createDestination);
destinationRouter.put('/:id',DestinationController.updateDestination);
destinationRouter.delete('/:id',DestinationController.deleteDestination);

export default destinationRouter;