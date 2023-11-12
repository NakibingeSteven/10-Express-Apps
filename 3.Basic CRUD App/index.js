const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//use body parser middle-ware to parse JSON requests
app.use(bodyParser.json());

//in memery stoarage for tasks
let tasks = [
  { id: 1, description: "Task 1" },
  { id: 2, description: "Task 2" },
  { id: 3, description: "Task 3" },
  { id: 4, description: "Task 4" },
  { id: 5, description: "Task 5" },
  { id: 6, description: "Task 6" },
];

//READ ALL TASKS
//GET all tasks
app.get("/", (req, res) => {
  res.json(tasks);
});

//READ TASKS BY ID
//Get a specific taks by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id); //cast the id

  //filter for id
  const task = tasks.find((t) => t.id === taskId);

  //test if it exists
  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(task);
  }
});

//CREATE A  NEW TASK
//create a new task
//text using post man if you haevno gui
app.post("/tasks", (req, res) => {
  //get a newdscription from request
  //use body-parser middleware to parse incoming JSON requests, enabling you to access the JSON data in req.body.
  const { description } = req.body;

  // Log the request body for debugging
  console.log("Request Body:", req.body);

  //create new taaks
  const newTask = { id: tasks.length + 1, description: description }; //create new task
  tasks.push(newTask); //add task to bigger array
  res.status(201).json(newTask);
});

///UPDATE A TASK
//update task by id
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id); //cast the id

  //filter for id
  const task = tasks.find((t) => t.id === taskId);

  //test if it exists
  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    task.description = req.body.description; //set new dsescription
    res.json(task);
  }
});

//DELETE A  TASK
//delete task by id
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id); //cast the id to string
  //filter for id
  const task = tasks.filter((t) => t.id === taskId); //filter/delete it out
  res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
