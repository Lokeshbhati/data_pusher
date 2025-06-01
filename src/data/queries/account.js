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

    static getAccountsDestinations = this.database.prepare(`
        SELECT 
            d.destination_id,
            d.url,
            d.http_method,
            h.header_id,
            h.header_key,
            h.header_value
        FROM 
            destinations d
        LEFT JOIN 
            destination_headers h ON d.destination_id = h.destination_id
        WHERE 
            d.account_id = ?;
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