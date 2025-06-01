import Database from "../database.js";

class AccountQuery {
    static database = Database.connectDB();

    static createAccount = this.database.prepare(`
        INSERT INTO accounts (email_id, account_name, app_secret_token, website)
        VALUES (?, ?, ?, ?)
        RETURNING account_id, email_id, account_name, app_secret_token, website
    `);

    static getAccounts = this.database.prepare(`
        SELECT * FROM accounts
    `);

    static getAccountsById = this.database.prepare(`
        SELECT *
        FROM accounts
        WHERE account_id=?
    `);

    static getAccountsByAppSecretToken = this.database.prepare(`
        SELECT *
        FROM accounts
        WHERE app_secret_token=?
    `);

    static updateAccount = this.database.prepare(`
        UPDATE accounts
        SET 
            email_id = ?,
            account_name = ?,
            website = ?
        WHERE
            account_id = ?;
        RETURNING account_id, email_id, account_name, app_secret_token, website
    `);

    static deleteAccount = this.database.prepare(`
        DELETE FROM accounts
        WHERE account_id = ?;
    `);
}

export default AccountQuery;