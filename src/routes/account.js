import express from 'express';
import AccountController from '../controllers/account.js';
const accountRouter = express.Router();

accountRouter.get('/', AccountController.getAccount);
accountRouter.get('/:id',AccountController.getAccountById);
accountRouter.get('/:id/destinations',AccountController.getAccountDestinations);
accountRouter.post('/',AccountController.createAccount);
accountRouter.put('/:id',AccountController.updateAccount);
accountRouter.delete('/:id',AccountController.deleteAccount);

export default accountRouter;