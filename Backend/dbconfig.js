// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";


const url = 'mongodb+srv://todoapp_db_user:DC%40_99677%5E%25%26%28@clustertodo.9ben2ey.mongodb.net/';
export const collectionName = "todo";
const dbName = 'node-project';
const client = new MongoClient(url)
export const connection = async () => {
    
    const connect = await client.connect();
    return await connect.db(dbName)
}


