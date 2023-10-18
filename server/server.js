const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended : false}))

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});

app.post("/addTask",(req,res) => {
    console.log(req.body)
})

app.get("/taskList",(req,res) => {
    res.json("task" = {Message : "lorem as apppps  p ps:pqdqsdp" , dueDate : "2023/30/30"})
})