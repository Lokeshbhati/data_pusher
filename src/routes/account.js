import express from 'express';
import AccountController from '../controllers/account.js';
import DestinationController from '../controllers/destination.js';
const accountRouter = express.Router();

accountRouter.get('/', AccountController.getAccount);
accountRouter.get('/:id',AccountController.getAccountById);
accountRouter.get('/:id/destinations',DestinationController.getDestinationsByAccountId);
accountRouter.post('/',AccountController.createAccount);
accountRouter.put('/:id',AccountController.updateAccount);
accountRouter.delete('/:id',AccountController.deleteAccount);

export default accountRouter;