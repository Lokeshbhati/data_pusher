import Database from "../database.js";

class DestinationQuery {
    static database = Database.connectDB();

    static createDestination = this.database.prepare(`
        INSERT INTO destinations (account_id, url, http_method)
        VALUES (?, ?, ?)
        RETURNING destination_id, account_id, url, http_method
    `);

    static getDestinations = this.database.prepare(`
        SELECT 
            d.destination_id,
            d.account_id,
            d.url,
            d.http_method
        FROM destinations d
    `);

    static getDestinationById = this.database.prepare(`
          SELECT 
            d.destination_id,
            d.account_id,
            d.url,
            d.http_method
        FROM destinations d
        WHERE d.destination_id = ?
    `);

    static updateDestination = this.database.prepare(`
        UPDATE destinations
        SET url = ?, http_method = ?
        WHERE destination_id = ?
        RETURNING destination_id, account_id, url, http_method
    `);

    static deleteDestination = this.database.prepare(`
        DELETE FROM destinations WHERE destination_id = ?
    `);

    static insertHeader = this.database.prepare(`
        INSERT INTO destination_headers (destination_id, header_key, header_value)
        VALUES (?, ?, ?)
        RETURNING header_id, header_key, header_value
    `);

    static getHeaders = this.database.prepare(`
        SELECT 
            header_id,
            header_key,
            header_value
        FROM destination_headers
        WHERE destination_id = ?;
    `);
}

export default DestinationQuery;