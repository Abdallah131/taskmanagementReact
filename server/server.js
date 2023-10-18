const express = require("express")
const bodyParser = require("body-parser")
const Joi = require("joi");
const mysql = require("mysql");

const app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskmanager",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the MySQL database");
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});

app.post("/addTask",(req,res) => {
    console.log(req.body)
    const message = req.body.message;
    const dueDate = req.body.dueDate;
  
    const schema = Joi.object({
    message: Joi.string().required(),
    dueDate: Joi.string().min(8).trim().required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (!error) {
      const sql = "INSERT INTO tasks (taskMessage, taskDueDate) VALUES (?, ?)";
      db.query(sql, [message, dueDate], (err, result) => {
        if (err) {
          console.error(err);
          res.send("Something went Wrong!.");
        } else {
            res.redirect("/");
        }
      });
    } else {
      res.send("Error occurred!");
    }
})

app.get("/taskList", (req, res) => {
    const sql = "SELECT * FROM tasks";
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error occurred while fetching tasks.");
      } else {
        res.json(results);
      }
    });
  });
  
app.post("/updateStatus", (req, res) => {
  const taskId = req.body.taskId;
  const newStatus = req.body.newStatus;

  const sql = "UPDATE tasks SET taskStatus = ? WHERE taskid = ?";
  db.query(sql, [newStatus, taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error occurred while updating the task status.");
    } else {
      res.send("Task status updated successfully.");
    }
  });
});
  