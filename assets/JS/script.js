function createForm() {
  // Create a form to fill.
  let form = document.createElement("form");
  form.classList.add("taskForm");
  form.classList.add("boxShadows");
  form.classList.add("gradientConvexe");
  noCategory.appendChild(form);

  let nameWrapper = document.createElement("div");
  nameWrapper.classList.add("nameWrapper");
  nameWrapper.classList.add("boxShadows");
  nameWrapper.classList.add("gradientConvexe");
  nameWrapper.textContent = "Name";
  form.appendChild(nameWrapper);

  // Create the input for the name of the task.
  let taskName = document.createElement("input");
  taskName.classList.add("taskName");
  taskName.classList.add("boxShadows");
  taskName.classList.add("gradientConcave");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("placeholder", "Enter your Task");
  nameWrapper.appendChild(taskName);

  let dateWrapper = document.createElement("div");
  dateWrapper.classList.add("dateWrapper");
  dateWrapper.classList.add("boxShadows");
  dateWrapper.classList.add("gradientConvexe");
  dateWrapper.textContent = "Date";
  form.appendChild(dateWrapper);
  // Create a button to add a date.
  // let dateButton = document.createElement("button");
  // dateButton.classList.add("dateButton");
  // dateButton.classList.add("boxShadows");
  // dateButton.classList.add("gradientConcave");
  // dateButton.textContent = "Add Date";
  // dateWrapper.appendChild(dateButton);

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = Date();
  dateInput.classList.add("dateInput");
  dateInput.classList.add("boxShadows");
  dateInput.classList.add("gradientConvexe");
  dateWrapper.appendChild(dateInput);

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
    let date = dateInput.value;

    let dateContainer = document.createElement("p");
    nameContainer.classList.add("nameContainer");
    nameContainer.textContent = name;
    dateContainer.classList.add("dateContainer");
    if (date === "") {
      date = "Undefined Date";
    }
    dateContainer.textContent = date;

    nameWrapper.appendChild(nameContainer);
    dateWrapper.appendChild(dateContainer);
    taskName.remove();
    dateInput.remove();
    addTaskButton.remove();
    open = false;
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
  });
  function destroyForm() {
    let taskForm = document.querySelector(".taskForm");
    open = false;
    taskForm.remove();
  }
}

let open = false;
newTask.addEventListener("click", function () {
  if (open == false) {
    createForm();
    open = true;
  } else {
    alert("Please complete the actual field before opening a new one.");
  }
});

function createCategory() {
  let addCategoryButton = document.createElement("input");
  addCategoryButton.classList.add("addCategory");
  addCategoryButton.classList.add("boxShadows");
  addCategoryButton.classList.add("gradientConcave");
  addCategoryButton.setAttribute("type", "text");
  addCategoryButton.setAttribute("placeholder", "Give a name to your category");
  categories.appendChild(addCategoryButton);

  addCategoryButton.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let titleCategory = addCategoryButton.value;
      let category = document.createElement("ul");
      category.textContent = titleCategory;
      category.classList.add(`${titleCategory}`);
      category.classList.add("boxShadows");
      category.classList.add("gradientConcave");
      categories.appendChild(category);
      addCategoryButton.remove();
      open = false;
    }
  });
}

newCategory.addEventListener("click", function () {
  if (open == false) {
    createCategory();
    open = true;
  } else {
    alert("Please complete the actual field before opening a new one.");
  }
});
