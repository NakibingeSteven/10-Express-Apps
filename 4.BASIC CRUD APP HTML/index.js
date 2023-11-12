const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: 1, description: "Task 1" },
  { id: 2, description: "Task 2" },
  { id: 3, description: "Task 3" },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(task);
  }
});

app.post("/tasks", (req, res) => {
  const { description } = req.body;
  const newTask = { id: tasks.length + 1, description };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    task.description = req.body.description;
    res.json(task);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
