import AccountQuery from "../data/queries/account.js";
import generateAppSecretToken from "../utils/generateAppSecretToken.js";
import httpStatus from "../utils/httpStatus.js";

class AccountController {
    static prepareResponse = (row) => {
        return {
            accountId: row.account_id,
            emailId: row.email_id,
            accountName: row.account_name,
            appSecretToken: row.app_secret_token,
            website: row.website
        }
    }

    static getAccount = async (req,res)=> {
        console.log(`Controller called: getAccount`);
        try {
            let accounts = AccountQuery.getAccounts.all();
            if(accounts && accounts.length > 0){
                console.log(`Accounts found: ${JSON.stringify(accounts)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, message: "Accounts fetched successfully!!", data: accounts.map(account => this.prepareResponse(account)) });
            } else {
                console.log("Accounts not found");
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: "Accounts not found", data: [] });
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static getAccountById  = async (req,res)=> {
        console.log(`Controller called: getAccountById`);
        try {
            let accountId = req.params.id;
            console.log(`Account id: ${accountId}`);
            let recoredAccount = AccountQuery.getAccountsById.get(accountId);
            if(recoredAccount){
                console.log(`Recorded account: ${JSON.stringify(recoredAccount)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Account fetched successfully for account id: ${accountId}`, data: this.prepareResponse(recoredAccount)});
            } else {
                console.log(`Account not found for account id: ${accountId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Account not found for account id: ${accountId}`});
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static createAccount = async (req,res)=> {
        console.log(`Controller called: createAccount`);
        try {
            let { emailId, accountName, website } = req.body;
            let appSecretToken = generateAppSecretToken();
            let newAccount = AccountQuery.createAccount.get(emailId, accountName, appSecretToken, website);
            console.log(`New account: ${JSON.stringify(newAccount)}`);
            return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Account created successfully for account id: ${newAccount.account_id}`, data: this.prepareResponse(newAccount) });
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static updateAccount = async (req,res)=> {
        console.log(`Controller called: updateAccount`);
        try {
            let accountId = req.params.id;
            console.log(`Account id: ${accountId}`);
            let { emailId, accountName, website } = req.body;
            let recoredAccount = AccountQuery.getAccountsById.get(accountId);
            if(recoredAccount){
                let updatedAccount = AccountQuery.updateAccount.run(emailId, accountName, website, Number(accountId));
                console.log(`Updated account: ${JSON.stringify(updatedAccount)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Account updated successfully for account id: ${accountId}`});
            } else {
                console.log(`Account not found for account id: ${accountId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Account not found for account id: ${accountId}`});
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static deleteAccount = async (req,res)=> {
        console.log(`Controller called: deleteAccount`);
        try {
            let accountId = req.params.id;
            console.log(`Account id: ${accountId}`);
            let recoredAccount = AccountQuery.getAccountsById.get(accountId);
            if(recoredAccount){
                let deletedAccount = AccountQuery.deleteAccount.run(Number(accountId));
                console.log(`Deleted account: ${JSON.stringify(deletedAccount)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Account deleted successfully for account id: ${accountId}`});
            } else {
                console.log(`Account not found for account id: ${accountId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Account not found for account id: ${accountId}`});
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }
}

export default AccountController;