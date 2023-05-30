document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Get task details from form inputs
    var taskName = document.getElementById("taskName").value;
    var dueDate = document.getElementById("timeDue").value;
    var description = document.getElementById("taskDescription").value;

    // Create new task object
    var task = {
      name: taskName,
      date: dueDate,
      description: description,
      status: "pending",
    };
    function addTaskToList(task) {
      let taskList = document.getElementById("taskList");
      taskList.innerHTML = `<div class='task'>
            <h1>${task.name}</h1>  
            <p>${task.description}</p>
            <span>${task.date}</span>
      </div>`;
    }

    // Add the new task to the task list
    addTaskToList(task);

    // Clear form inputs
    document.getElementById("taskName").value = "";
    document.getElementById("timeDue").value = "";
    document.getElementById("taskDescription").value = "";
  });
