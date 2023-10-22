const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());
app.listen(4000)

mongoose.connect('mongodb://127.0.0.1:27017/test');


const taskSchema = new mongoose.Schema({
    message: {
        type : String,
        required : true
    },
    dueDate:{
        type : String,
        required : true,
        minLength : 6
    },
    status:{
        type : String,
        default : "On Going"
    }
})

const tasksCollection = mongoose.model("tasksCollection", taskSchema);

app.post("/addTask", (req, res) => {
  const message = req.body.message;
  const dueDate = req.body.dueDate;

  const newTask = new tasksCollection({
      message: message,
      dueDate: dueDate
  });
  newTask.save()
      .then((task) => {
          res.redirect("/")
      })
      .catch((error) => {
          res.status(400).json("Failed to add task");
      });
});

app.get("/taskList", (req, res) => {
  tasksCollection.find()
      .exec()
      .then((tasks) => {
          res.status(200).json(tasks);
      })
      .catch((error) => {
          res.status(500).json({ message: "Failed to retrieve task list", error: error.message });
      });
});

  
app.post("/updateStatus", (req, res) => {
  const taskId = req.body.taskId;
  const newStatus = req.body.newStatus;

  tasksCollection.findByIdAndUpdate(
    taskId,
    { status: newStatus },
    { new: true }
  )
    .exec()
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to update task status", error: error.message });
    });
});

  
app.delete("/deleteTask", (req, res) => {
  const taskId = req.body.taskId;

  tasksCollection.findByIdAndRemove(taskId)
    .exec()
    .then((task) => {
      if (task) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to delete task", error: error.message });
    });
});
;

app.post("/specTask", (req, res) => {
  const taskId = req.body.taskId;

  tasksCollection.findById(taskId)
    .exec()
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to retrieve specific task", error: error.message });
    });
});


app.post("/editTask", (req, res) => {
  const taskId = req.body.taskId;
  const newMessage = req.body.message;
  const newDueDate = req.body.dueDate;

  tasksCollection.findByIdAndUpdate(
    taskId,
    { message: newMessage, dueDate: newDueDate },
    { new: true }
  )
    .exec()
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to edit task", error: error.message });
    });
});

