import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = express();
const Port = 8000;

app.use(cors()); // jab backend aur frontend alag alag port pe chalta hai
app.use(express.json()); //Middleware

// POST

app.post("/add-task", async (req, res) => {
  try {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    console.log(req.body);
    if (result) {
      res.send({ message: "task added", success: true, result });
    } else {
      res.send({ message: "task not added", success: false});
    }
  } catch (error) {
    console.error("error inserting task", error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});


//GET

app.get("/tasks", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({
      message: "task list fetched",
      success: true,
      result,
    });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});


// Reflect Data to UI
app.get('/task/:id', async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({_id:new ObjectId(id)});
  if (result){
    res.send({message: "Task Updated", success: true, result})
  } else{
    res.send({message: "Update Failed", success: false})
  }
})

// PUT

app.put('/update-task', async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const {_id, ...fields} = req.body;
  const update = {$set:fields};
  const result = await collection.updateOne({_id:new ObjectId(_id)}, update)
  if (result) {
    res.send({message: "Task Updated", success: true, result})
  } else{
    res.send({message: "Try after somethime", success: false})
  }
})


//DELETE

app.delete("/delete/:id", async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName)
  const result = await collection.deleteOne({_id:new ObjectId(id)})
  if (result) {
    res.send({ message: "task deleted", success: true, result })
  } else{
    res.send({ message: "error try after sometime", success: false })
  }
})


// Delete By Using SelectAll Method

app.delete("/delete-selected", async (req, res) =>{
  const db = await connection();
  const Ids = req.body;
  const deleteTaskIds = Ids.map((item) => new ObjectId(item))
  console.log(Ids)

  const collection = await db.collection(collectionName);
  const result = await collection.deleteMany({_id:{$in:deleteTaskIds}})
  if(result){
    res.send({message: "Task Successfully deleted", success: result})
  } else{
    res.send({message: "Try After Sometime", success: false})
}
})

app.listen(Port, () => {
  console.log(`Server is started on port ${Port}`);
});
