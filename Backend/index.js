import express from "express";
import { collectionName, connection } from './dbconfig.js'

const app = express();
const Port = 8000;

app.use(express.json());
app.post("/add-task", async (req,res)=>{
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (!result){
        res.send({message:"task not added", success:false})
    }   else{
        res.send({message:"task added", success:true,result})
    }
})


app.get("/", (req, res) => {
    res.send({
        massage:"Basic API done",
        success:true,
    })
})


app.listen(8000, () => {
    console.log(`Server is started on port ${Port}`)
})