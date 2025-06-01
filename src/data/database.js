import { DatabaseSync } from "node:sqlite";

class Database {
  static _db = new DatabaseSync(`${import.meta.dirname}/main.db`);
  static initDB = async () => {
    console.log(`Function called: initDB`);
    try {
      const initDatabase = `
        CREATE TABLE IF NOT EXISTS accounts (
            account_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email_id TEXT NOT NULL UNIQUE,
            account_name TEXT NOT NULL,
            app_secret_token TEXT NOT NULL UNIQUE,
            website TEXT
        );

        CREATE TABLE IF NOT EXISTS destinations (
            destination_id INTEGER PRIMARY KEY AUTOINCREMENT,
            account_id INTEGER NOT NULL,
            url TEXT NOT NULL,
            http_method TEXT NOT NULL,
            FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS destination_headers (
            header_id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination_id INTEGER NOT NULL,
            header_key TEXT NOT NULL,
            header_value TEXT NOT NULL,
            FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
        );
      `;
      this._db.exec(initDatabase);
      console.log(`DB initialized successfully!!`);
    } catch (err) {
      console.log("Error occured while initializing database: ", err.message);
      throw err;
    }
  };

  static connectDB = () => {
    if(!this._db){
      console.log(`Database instance not found, initating connect refresh.`);
      return this.initDB();
    } else {
      console.log(`Database instance found: ${JSON.stringify(this._db)}`);
      return this._db;
    }
  }
}

export default Database;
