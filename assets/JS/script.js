function createForm() {
  // Create a form to fill. First thing to do is Enter the name of the task.
  let formWrapper = document.querySelector("#taskManager");
  let form = document.createElement("form");
  form.classList.add("taskForm");
  formWrapper.appendChild(form);

  let taskName = document.createElement("input");
  taskName.classList.add("taskName");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("placeholder", "Enter your Task");
  form.appendChild(taskName);
  // Create a button to add a date.
  let dateButton = document.createElement("button");
  dateButton.classList.add("dateButton");
  dateButton.textContent = "Add Date";
  form.appendChild(dateButton);
  // If the button is clicked, create a date input and a button to cancel the
  dateButton.addEventListener("click", function (event) {
    event.preventDefault();
    let clicked = false;
    if (!clicked) {
      let dateInput = document.createElement("input");
      dateInput.classList.add("dateInput");
      dateInput.setAttribute("type", "date");
      form.appendChild(dateInput);
      clicked = true;
    } else {
      return;
    }

    let removeDateInput = document.createElement("button");
    removeDateInput.classList.add("removeDateInput");
    removeDateInput.textContent = "-";
    form.appendChild(removeDateInput);

    removeDateInput.addEventListener("click", function (event) {
      event.preventDefault();
      let dateInput = document.querySelector(".dateInput");
      dateInput.remove();
      removeDateInput.remove();
      let dateButton = document.createElement("button");
      dateButton.classList.add(".dateButton");
      dateButton.textContent = "Add Date";
      form.appendChild(dateButton);
    });
  });

  let addTaskButton = document.createElement("button");
  addTaskButton.classList.add("addTaskButton");
  addTaskButton.textContent = "+";
  form.appendChild(addTaskButton);

  addTaskButton.addEventListener("click", function (event) {
    event.preventDefault();
    addTaskToList(task);
  });

  let removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("removeTaskButton");
  removeTaskButton.textContent = "-";
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
