let addCategory = document.querySelector(".addCategory");
let categoriesWrapper = document.querySelector(".categoriesWrapper");

function saveData() {
  let categories = Array.from(document.querySelectorAll(".newCategory")).map(
    (category) => {
      let categoryName = category.querySelector(".categoryName").textContent;
      let tasks = Array.from(category.querySelectorAll(".newTask")).map(
        (task) => {
          let taskName = task.querySelector(
            ".taskDetails > .taskName"
          ).textContent;
          let taskDate = task.querySelector(
            ".taskDetails > .taskDate"
          ).textContent;
          return { name: taskName, date: taskDate };
        }
      );
      return { name: categoryName, tasks: tasks };
    }
  );
  localStorage.setItem("categories", JSON.stringify(categories));
}

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

      category.tasks.forEach((task) => {
        let newTask = document.createElement("div");
        newTask.classList.add("newTask");
        newCategory.appendChild(newTask);

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
      });
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
  categoryName.setAttribute("placeholder", `"Category Name"`);
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

addCategory.addEventListener("click", () => {
  createCategory();
});

function setCategoryName(categoryNameInput, newCategory) {
  let categoryNameValue = categoryNameInput.value;
  let categoryNameHeading = document.createElement("h2");
  categoryNameHeading.classList.add("categoryName");
  categoryNameHeading.textContent = categoryNameValue;

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
    if (event.key == "Enter") {
      addTaskNameToTask(taskName.value, taskDetails);
      taskName.remove();
      taskDate.focus();
      saveData();
    }
  });

  taskDate.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      addTaskDateToTask(taskDate.value, taskDetails);
      taskDate.remove();
      saveData();
    }
  });

  category.insertBefore(newTask, addNewTask);
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

loadData();

let categoriesList = localStorage.getItem(categories);
console.log(categoriesList);
