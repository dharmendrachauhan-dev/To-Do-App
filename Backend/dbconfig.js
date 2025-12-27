// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";



const url = process.env.DB_URL; // Add your Data base url Connection
export const collectionOne = "todo";
export const collectionTwo = "users";
const dbName = 'node-project';
const client = new MongoClient(url)
export const connection = async () => {
    
    const connect = await client.connect();
    return await connect.db(dbName)
}


