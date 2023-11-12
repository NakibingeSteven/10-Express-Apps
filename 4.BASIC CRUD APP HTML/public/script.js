//get the taks from server and load them into table using the fetch api
document.addEventListener("DOMContentLoaded", () => {
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const row = createTableRow(task);
      taskList.appendChild(row);
    });
  };

  //function to create the row
  const createTableRow = (task) => {
    const row = document.createElement("tr");

    // Create table cells
    const idCell = document.createElement("td");
    idCell.textContent = task.id;
    row.appendChild(idCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = task.description;
    row.appendChild(descriptionCell);

    const actionCell = document.createElement("td");

    // Create buttons for actions
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);
    actionCell.appendChild(deleteButton);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.onclick = () => updateTask(task.id);
    actionCell.appendChild(updateButton);

    row.appendChild(actionCell);

    return row;
  };

  window.addTask = async () => {
    const taskDescription = document.getElementById("taskDescription").value;

    if (!taskDescription) {
      alert("Please enter a task description.");
      return;
    }

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: taskDescription }),
    });

    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const updateTask = async (taskId) => {
    const newDescription = prompt("Enter the new task description:");

    if (newDescription !== null) {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newDescription }),
      });

      fetchTasks();
    }
  };

  fetchTasks();
});
