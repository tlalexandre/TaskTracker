// Selectors
let addCategory = document.querySelector(".addCategory");
let categoriesWrapper = document.querySelector(".categoriesWrapper");

// Save data from categories and tasks in LocalStorage
function saveData() {
  let categories = Array.from(document.querySelectorAll(".newCategory")).map(
    (category) => {
      let categoryName = category.querySelector(".categoryName").textContent;
      let tasks = Array.from(category.querySelectorAll(".newTask")).map(
        (task) => {
          let taskName = task.querySelector(".taskName").textContent;
          let taskDate = task.querySelector(" .taskDate").textContent;
          let taskDone = task.classList.contains("done");
          return { name: taskName, date: taskDate, done: taskDone };
        }
      );
      return { name: categoryName, tasks: tasks };
    }
  );
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Load data saved in LocalStorage

function loadData() {
  let savedData = localStorage.getItem("categories");
  if (savedData) {
    let categories = JSON.parse(savedData);
    categories.forEach((category) => {
      let newCategory = document.createElement("div");
      newCategory.classList.add("newCategory");
      categoriesWrapper.appendChild(newCategory);

      let categoryNameHeading = document.createElement("h2");
      categoryNameHeading.classList.add("categoryName");
      categoryNameHeading.textContent = category.name;
      newCategory.appendChild(categoryNameHeading);

      let addNewTask = document.createElement("button");
      addNewTask.classList.add("addNewTask");
      addNewTask.textContent = "New Task";
      newCategory.appendChild(addNewTask);

      categoryNameHeading.addEventListener("dblclick", () => {
        removeCategory(newCategory);
        saveData();
      });
      category.tasks.forEach((task) => {
        let newTask = document.createElement("div");
        newTask.classList.add("newTask");
        if (task.done) {
          newTask.classList.add("done");
        }
        newCategory.insertBefore(newTask, addNewTask);

        let taskDetails = document.createElement("div");
        taskDetails.classList.add("taskDetails");
        newTask.appendChild(taskDetails);

        let taskNameHeading = document.createElement("h3");
        taskNameHeading.classList.add("taskName");
        taskNameHeading.textContent = task.name;
        taskDetails.appendChild(taskNameHeading);

        let taskDateHeading = document.createElement("p");
        taskDateHeading.classList.add("taskDate");
        taskDateHeading.textContent = task.date;
        taskDetails.appendChild(taskDateHeading);

        newTask.addEventListener("click", () => {
          toggleTaskDone(newTask);
          saveData();
        });
        newTask.addEventListener("dblclick", () => {
          removeTask(newTask);
          saveData();
        });
      });
      addNewTaskListener(addNewTask);
    });
  }
}

function createCategory() {
  let newCategory = document.createElement("div");
  newCategory.classList.add("newCategory");
  categoriesWrapper.appendChild(newCategory);

  let categoryName = document.createElement("input");
  categoryName.classList.add("categoryNameInput");
  categoryName.setAttribute("type", "text");
  categoryName.setAttribute("placeholder", "Category Name");
  newCategory.appendChild(categoryName);

  let addNewTask = document.createElement("button");
  addNewTask.classList.add("addNewTask");
  addNewTask.textContent = "New Task";
  newCategory.appendChild(addNewTask);

  categoryName.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      setCategoryName(categoryName, newCategory);
      saveData();
    }
  });
  categoriesWrapper.insertBefore(newCategory, categoriesWrapper.firstChild);

  addNewTask.addEventListener("click", () => {
    createTask(newCategory, addNewTask);
    saveData();
  });
}

function addNewTaskListener(addNewTask) {
  addNewTask.addEventListener("click", () => {
    createTask(addNewTask.parentElement, addNewTask);
    saveData();
  });
}

addCategory.addEventListener("click", () => {
  createCategory();
});

function setCategoryName(categoryNameInput, newCategory) {
  let categoryNameValue = categoryNameInput.value;
  let categoryNameHeading = document.createElement("h2");
  categoryNameHeading.classList.add("categoryName");
  categoryNameHeading.textContent = categoryNameValue;

  categoryNameHeading.addEventListener("dblclick", () => {
    removeCategory(newCategory);
    saveData();
  });
  newCategory.insertBefore(categoryNameHeading, newCategory.firstChild);
  categoryNameInput.remove();
}

function createTask(category, addNewTask) {
  let newTask = document.createElement("div");
  newTask.classList.add("newTask");

  let taskDetails = document.createElement("div");
  taskDetails.classList.add("taskDetails");
  newTask.appendChild(taskDetails);

  let taskName = document.createElement("input");
  taskName.classList.add("taskNameInput");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("placeholder", `"Task Name"`);
  newTask.appendChild(taskName);

  let taskDate = document.createElement("input");
  taskDate.classList.add("taskDateInput");
  taskDate.setAttribute("type", "date");
  newTask.appendChild(taskDate);

  taskName.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addTaskNameToTask(taskName.value, taskDetails);
      taskName.remove();
      taskDate.focus();
      saveData();
    }
  });

  taskDate.addEventListener("change", (event) => {
    const inputDate = new Date(taskDate.value);
    const dayOfWeek = inputDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = inputDate.getDate();
    const month = inputDate.toLocaleDateString("en-US", { month: "long" });
    const dateSuffix = getDateSuffix(date);

    const formattedDate = `For ${dayOfWeek}, ${date}${dateSuffix} of ${month}`;
    addTaskDateToTask(formattedDate, taskDetails);
    taskDate.remove();
    saveData();
  });

  newTask.addEventListener("dblclick", () => {
    removeTask(newTask);
    saveData();
  });
  newTask.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
      return;
    }
    toggleTaskDone(newTask);
    saveData();
  });

  category.insertBefore(newTask, addNewTask);
}

function toggleTaskDone(newTask) {
  newTask.classList.toggle("done");
  saveData();
}

function removeTask(task) {
  const deleteConfirmationText = "Are you sure you want to delete this task?";

  // Display the deletion confirmation text in the task
  task.textContent = deleteConfirmationText;
  // Add styling to indicate deletion
  task.style.backgroundColor = "red";
  task.style.fontWeight = "bold";

  // Add a click event listener to handle the actual deletion
  task.addEventListener("click", () => {
    let category = task.parentElement;
    category.removeChild(task);
    saveData();
  });
}

function removeCategory(category) {
  if (confirm("Are you sure you want to delete this category?")) {
    categoriesWrapper.removeChild(category);
    saveData();
  }
}

function addTaskNameToTask(taskName, taskDetails) {
  let task = document.createElement("h3");
  task.classList.add("taskName");
  task.textContent = taskName;

  taskDetails.insertBefore(task, taskDetails.firstChild);
}

function addTaskDateToTask(taskDate, taskDetails) {
  let date = document.createElement("p");
  date.classList.add("taskDate");
  date.textContent = taskDate;

  taskDetails.appendChild(date);
}

function getDateSuffix(date) {
  if (date >= 11 && date <= 13) {
    return "th";
  }

  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

loadData();
