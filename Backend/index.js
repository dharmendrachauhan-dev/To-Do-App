import express from "express";

const app = express();
const Port = 8000;

app.get("/", (req, res) => {
    return res.send("Home Page")
})


app.listen(8000, () => {
    console.log(`Server is started on port ${Port}`)
})