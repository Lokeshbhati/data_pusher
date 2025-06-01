import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Database from "./src/data/database.js";
import config from "./config.js";
import authMiddleware from "./src/middlewares/auth.js";
import accountRouter from "./src/routes/account.js";
import destinationRouter from "./src/routes/destination.js";

const app = express();
const corsOptions = [
    "http://localhost:8080/"
]
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',async (req,res)=> {
    res.status(200).json({ status: 200, message: "Welcome to data pusher server!!", success: true });
});

app.use('/server/account',accountRouter);
app.use('/server/destination',destinationRouter);

app.use(authMiddleware);

const port = config.port;
app.listen(port, async ()=>{
    try{
        await Database.initDB();
        console.log(`App listening to port ${port}`);
    } catch(err){
        console.log(`Error occurred during initializing server: `,err.message);
        process.exit(1);
    }
});