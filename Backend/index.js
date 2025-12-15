import express from "express";
import { collectionName, connection } from './dbconfig.js'
import cors from 'cors'


const app = express();
const Port = 8000;

app.use(cors()); // jab backend aur frontend alag alag port pe chalta hai
app.use(express.json()); //Middleware

app.post("/add-task", async (req,res)=>{
   try {
     const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    console.log(req.body)
    if (!result){
        res.send({message:"task not added", success:false})
    }   else{
        res.send({message:"task added", success:true,result})
    }
   } catch (error) {
    console.error("error inserting task", error);
    res.status(500).send({
        message: "Internal Server Error",
        success: false
    })
   }  
})

app.get("/tasks",async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();
    if(result){
        res.send({
            message: "task list fetched",
            success: true, result
        })
    } else {
        res.send({ message: "error try after sometime", success: false })
    }
})





app.listen(Port, () => {
    console.log(`Server is started on port ${Port}`)
})