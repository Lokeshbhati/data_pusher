import Database from "../database.js";

class DestinationQuery {
    static database = Database.connectDB();

    static createDestination = db.prepare(`
        INSERT INTO destinations (account_id, url, http_method)
        VALUES (?, ?, ?)
        RETURNING destination_id, account_id, url, http_method
    `);

    static getDestination = db.prepare(`
        SELECT 
            d.destination_id,
            d.account_id,
            d.url,
            d.http_method,
            h.header_id,
            h.header_key,
            h.header_value
        FROM destinations d
        LEFT JOIN destination_headers h ON h.destination_id = d.destination_id
    `);

    static getDestinationById = db.prepare(`
          SELECT 
            d.destination_id,
            d.account_id,
            d.url,
            d.http_method,
            h.header_id,
            h.header_key,
            h.header_value
        FROM destinations d
        LEFT JOIN destination_headers h ON h.destination_id = d.destination_id
        WHERE d.destination_id = ?
    `);

    static updateDestination = db.prepare(`
        UPDATE destinations
        SET url = ?, http_method = ?
        WHERE destination_id = ?
        RETURNING destination_id, account_id, url, http_method
    `);

    static deleteDestination = db.prepare(`
        DELETE FROM destinations WHERE destination_id = ?
    `);

    static insertHeader = db.prepare(`
        INSERT INTO destination_headers (destination_id, header_key, header_value)
        VALUES (?, ?, ?)
    `);
}

module.exports = DestinationQuery;