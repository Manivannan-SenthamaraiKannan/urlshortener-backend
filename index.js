import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {MongoClient} from "mongodb";
import UserRoute from "./Routes/user.route.js";
import UrlRoute from "./Routes/url.route.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//PORT
const PORT = process.env.PORT;

//MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("...DB is Online...")
    return client;
}

export const client = await createConnection();

app.get('/',(req,res) => {
    res.send("<h1>URL-Shorter Application Backend</h1>")
})

//Custom Routes
app.use("/api/user", UserRoute);
app.use("/api/shortURL", UrlRoute);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})