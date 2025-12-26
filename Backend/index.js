import express from "express";
import { collectionOne, collectionTwo, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const Port = 8000;


app.use(express.json()); //Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); // jab backend aur frontend alag alag port pe chalta hai
app.use(cookieParser()); // Create prob with cors to solve make obj in cors...


// JWT Token Login In
app.post('/login', async (req, res) => {
  const userData = req.body;

  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection(collectionTwo);
    const result = await collection.findOne({email:userData.email, password:userData.password});

    if (result) {
      jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
        res.send({
          success: true,
          msg: 'login done',
          token
        })
      })
    } else {
      res.send({
        msg: 'User not found',
        success: false,
      })
    }
  } else{
    res.send({
      msg: 'Login failed',
      success: false,
    })
  }
}
)







// jWT Token Sign Up

app.post("/signup", async (req, res) => {
  const userData = req.body;

  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection(collectionTwo);
    const result = await collection.insertOne(userData);

    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "6d" }, (error, token) => {
       res.send({
        message: "Sign Up is Successfull",
        success: true,
        token
       })
      });
    }
  } else{
    res.send({
      message: "Sign up Unsuccessfull",
      success: false
    })
  }
});

// POST

app.post("/add-task", async (req, res) => {
  try {
    const db = await connection();
    const collection = await db.collection(collectionOne);
    const result = await collection.insertOne(req.body);
    console.log(req.body);
    if (result) {
      res.send({ message: "task added", success: true, result });
    } else {
      res.send({ message: "task not added", success: false });
    }
  } catch (error) {
    console.error("error inserting task", error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});

//GET Task

app.get("/tasks",verifyJwtToken, async (req, res) => {
  const db = await connection();
  console.log("cookies test", req.cookies)
  const collection = await db.collection(collectionOne);
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


// API Verification Done 
function verifyJwtToken(req, res, next) {
  // console.log('verifyJwtToken', req.cookies['token'])
  const token = req.cookies['token'];
  jwt.verify(token, 'Google', (error, decoded) => {
    if(error){
      return res.send({
        msg:'Invalid token',
        success: false
      })
    }
    console.log(decoded) // This give email and password
    next()
  })
}

// Reflect Data to UI
app.get("/task/:id", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionOne);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "Task Updated", success: true, result });
  } else {
    res.send({ message: "Update Failed", success: false });
  }
});

// PUT

app.put("/update-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionOne);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    res.send({ message: "Task Updated", success: true, result });
  } else {
    res.send({ message: "Try after somethime", success: false });
  }
});

//DELETE

app.delete("/delete/:id", async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionOne);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task deleted", success: true, result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

// Delete By Using SelectAll Method

app.delete("/delete-selected", async (req, res) => {
  const db = await connection();
  const Ids = req.body;
  const deleteTaskIds = Ids.map((item) => new ObjectId(item));
  console.log(Ids);

  const collection = await db.collection(collectionOne);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
  if (result) {
    res.send({ message: "Task Successfully deleted", success: result });
  } else {
    res.send({ message: "Try After Sometime", success: false });
  }
});

app.listen(Port, () => {
  console.log(`Server is started on port ${Port}`);
});
