function createForm() {
  // Create a form to fill.
  let formWrapper = document.querySelector("#taskManager");
  let form = document.createElement("form");
  form.classList.add("taskForm");
  form.classList.add("boxShadows");
  form.classList.add("gradientConvexe");
  formWrapper.appendChild(form);

  // Create the input for the name of the task.
  let taskName = document.createElement("input");
  taskName.classList.add("taskName");
  taskName.classList.add("boxShadows");
  taskName.classList.add("gradientConcave");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("placeholder", "Enter your Task");
  form.appendChild(taskName);

  // Create a button to add a date.
  let dateButton = document.createElement("button");
  dateButton.classList.add("dateButton");
  dateButton.classList.add("boxShadows");
  dateButton.classList.add("gradientConcave");
  dateButton.textContent = "Add Date";
  form.appendChild(dateButton);

  let clicked = false;
  // If the button is clicked, create a date input.
  dateButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (!clicked) {
      let dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.classList.add("dateInput");
      form.appendChild(dateInput);
      let labelDate = document.createElement("label");
      labelDate.setAttribute("for", dateInput);
      form.appendChild(labelDate);
      clicked = true;
      dateButton.remove();
    } else {
      return;
    }
  });

  let addTaskButton = document.createElement("button");
  addTaskButton.classList.add("addTaskButton");
  addTaskButton.classList.add("boxShadows");
  addTaskButton.classList.add("gradientConcave");
  addTaskButton.textContent = "Add Task";
  form.appendChild(addTaskButton);
  addTaskButton.addEventListener("click", function (event) {
    event.preventDefault();
    let name = taskName.value;
    let nameContainer = document.createElement("h2");
    nameContainer.classList.add("nameContainer");
    nameContainer.textContent = name;
    taskName.remove();
    form.appendChild(nameContainer);
  });
  let removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("removeTaskButton");
  removeTaskButton.classList.add("boxShadows");
  removeTaskButton.classList.add("gradientConcave");
  removeTaskButton.textContent = "Remove";
  form.appendChild(removeTaskButton);

  removeTaskButton.addEventListener("click", function (event) {
    event.preventDefault();
    destroyForm();

    console.log("je fonctionne");
  });
  function destroyForm() {
    let taskForm = document.querySelector(".taskForm");
    taskForm.remove();
  }
}

newTask.addEventListener("click", function () {
  createForm();
});

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
