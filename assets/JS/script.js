// Selectors
let addCategory = document.querySelector(".addCategory");
let categoriesWrapper = document.querySelector(".categoriesWrapper");
let getStartedButton = document.getElementById("getStarted");

getStartedButton.addEventListener("click", function () {
  window.scrollBy(0, window.innerHeight);
});
// Save data from categories and tasks in LocalStorage
function saveData() {
  let categories = Array.from(document.querySelectorAll(".newCategory")).map(
    (category) => {
      let categoryNameElement = category.querySelector(".categoryName");
      let categoryName = categoryNameElement
        ? categoryNameElement.innerHTML
        : "";
      if (categoryName.trim() === "") {
        return null;
      }
      let tasks = Array.from(category.querySelectorAll(".newTask")).map(
        (task) => {
          let taskNameElement = task.querySelector(".taskName");
          let taskDateElement = task.querySelector(".taskDate");
          if (!taskNameElement || !taskDateElement) {
            return null;
          }

          let taskName = task.querySelector(".taskName").textContent;
          let taskDate = task.querySelector(" .taskDate").textContent;
          if (taskName.trim() === "") {
            return null;
          }
          let taskDone = task.classList.contains("done");
          return { name: taskName, date: taskDate, done: taskDone };
        }
      );
      tasks = tasks.filter((task) => task != null);
      return { name: categoryName, tasks: tasks };
    }
  );
  categories = categories.filter((category) => category != null);
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Load data saved in LocalStorage

function loadData() {
  let savedData = localStorage.getItem("categories");
  // If the function finds some existing data in the local storage, it will create a category and the tasks that belongs to it
  if (savedData) {
    let categories = JSON.parse(savedData);
    categories.forEach((category) => {
      let newCategory = document.createElement("div");
      newCategory.classList.add("newCategory");
      categoriesWrapper.appendChild(newCategory);

      let deleteCategoryButton = document.createElement("button");
      deleteCategoryButton.classList.add("deleteCategoryButton");
      deleteCategoryButton.textContent = "X";
      deleteCategoryButton.style.background = "red";
      newCategory.appendChild(deleteCategoryButton);

      deleteCategoryButton.addEventListener("click", () => {
        removeCategory(newCategory);
        saveData();
      });
      let categoryNameHeading = document.createElement("h2");
      categoryNameHeading.classList.add("categoryName");
      categoryNameHeading.textContent = category.name;
      newCategory.appendChild(categoryNameHeading);

      let addNewTask = document.createElement("button");
      addNewTask.classList.add("addNewTask");
      addNewTask.textContent = "New Task";
      newCategory.appendChild(addNewTask);

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

        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("deleteTaskButton");
        deleteTaskButton.textContent = "X";
        deleteTaskButton.style.background = "red";
        newTask.appendChild(deleteTaskButton);

        deleteTaskButton.addEventListener("click", () => {
          removeTask(newTask);
          saveData();
        });

        newTask.addEventListener("click", () => {
          toggleTaskDone(newTask);
          saveData();
        });
      });
      addNewTaskListener(addNewTask);
    });
  }
}

// This function creates a category .
function createCategory() {
  let newCategory = document.createElement("div");
  newCategory.classList.add("newCategory");
  categoriesWrapper.appendChild(newCategory);

  let deleteCategoryButton = document.createElement("button");
  deleteCategoryButton.classList.add("deleteCategoryButton");
  deleteCategoryButton.textContent = "X";
  deleteCategoryButton.style.background = "red";
  newCategory.appendChild(deleteCategoryButton);

  deleteCategoryButton.addEventListener("click", () => {
    removeCategory(newCategory);
    saveData();
  });

  let categoryName = document.createElement("input");
  categoryName.classList.add("categoryNameInput");
  categoryName.setAttribute("type", "text");
  categoryName.setAttribute("placeholder", "New Category");
  newCategory.appendChild(categoryName);

  let addNewTask = document.createElement("button");
  addNewTask.classList.add("addNewTask");
  addNewTask.textContent = "New Task";
  newCategory.appendChild(addNewTask);
  // Event listener to add a name to the category
  categoryName.addEventListener("blur", () => {
    if (categoryName.value.trim() !== "") {
      setCategoryName(categoryName, newCategory);
      saveData();
    }
    if (categoryName.value.trim() == "") {
      alert("Please give a name to your category");
    }
  });
  categoriesWrapper.insertBefore(newCategory, categoriesWrapper.firstChild);
  addNewTaskListener(addNewTask);
}

function addNewTaskListener(addNewTask) {
  addNewTask.addEventListener("click", () => {
    createTask(addNewTask.parentElement, addNewTask);
    saveData();
  });
}
// Event listener on the addCategory button to create a new category

addCategory.addEventListener("click", () => {
  createCategory();
});
// Allow the user to validate the name of category, and replace the input by a heading.
function setCategoryName(categoryNameInput, newCategory) {
  let categoryNameValue = categoryNameInput.value.trim();
  if (categoryNameValue !== "") {
    let categoryNameHeading = document.createElement("h2");
    categoryNameHeading.classList.add("categoryName");
    categoryNameHeading.textContent = categoryNameValue;

    let deleteCategoryButton = newCategory.querySelector(
      ".deleteCategoryButton"
    );
    newCategory.insertBefore(
      categoryNameHeading,
      deleteCategoryButton.nextSibling
    );
    categoryNameInput.remove();
  }
}
// Create a task.
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

  taskName.addEventListener("blur", (event) => {
    if (taskName.value.trim() !== "") {
      addTaskNameToTask(taskName.value, taskDetails);
      taskName.remove();
      taskDate.focus();
      saveData();
    }
    if (taskName.value.trim() == "") {
      alert("Please give a name to your task");
    }
  });

  let deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("deleteTaskButton");
  deleteTaskButton.textContent = "X";
  deleteTaskButton.style.background = "red";
  newTask.appendChild(deleteTaskButton);

  deleteTaskButton.addEventListener("click", () => {
    if (taskName.value.trim() != "") {
      removeTask(newTask);
      saveData();
    } else {
      alert("Please give a name to your task before deleting it");
    }
  });

  // Checks if the date is anterior to the date of Today when a task is created and prevent the user to create a task in the past.
  taskDate.addEventListener("change", (event) => {
    const today = new Date().toISOString().split("T")[0];
    let inputDate = new Date(taskDate.value);

    if (inputDate < new Date(today)) {
      inputDate = new Date(today);
    }
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

  // Event listener to add the class done to a task. This results in the task background turning green.
  newTask.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
      return;
    }
    toggleTaskDone(newTask);
    saveData();
  });

  category.insertBefore(newTask, addNewTask);
}
// Add class done to a task
function toggleTaskDone(newTask) {
  newTask.classList.toggle("done");
  saveData();
}
// Delete a task
function removeTask(task) {
  const deleteConfirmationText = "Are you sure you want to delete this task?";
  const originalTaskName = task.querySelector(".taskName")?.textContent || "";
  const originalTaskDate = task.querySelector(".taskDate")?.textContent || "";

  task.style.backgroundColor = " rgb(187 82 82 / 46%)";
  task.style.fontWeight = "bold";

  // Create and append a Confirm and a Cancel button .
  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirmButton");
  confirmButton.textContent = "V";
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelButton");
  cancelButton.textContent = "X";

  task.innerHTML = `<p>${deleteConfirmationText}</p>`;
  task.appendChild(confirmButton);
  task.appendChild(cancelButton);
  // The Confirm button deletes the task.
  confirmButton.addEventListener("click", () => {
    let category = task.parentElement;
    category.removeChild(task);
    saveData();
  });
  // The Cancel Button brings back the name and the date of the task to its original state.
  cancelButton.addEventListener("click", () => {
    task.innerHTML = ""; // Clear the task content
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("taskDetails");
    task.appendChild(taskDetails);
    addTaskNameToTask(originalTaskName, taskDetails);
    addTaskDateToTask(originalTaskDate, taskDetails);
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("deleteTaskButton");
    deleteTaskButton.textContent = "X";
    deleteTaskButton.style.background = "red";
    task.appendChild(deleteTaskButton);

    deleteTaskButton.addEventListener("click", () => {
      removeTask(task);
      saveData();
    });

    task.style.backgroundColor = "rgb(82 135 187 / 60%)";
    saveData();
  });
}
// This allows the user to remove a category.
function removeCategory(category) {
  const deleteCategoryText = "Are you sure you want to delete that category?";
  const categoryName = category.querySelector(".categoryName");

  if (categoryName) {
    let originalCategoryName = categoryName ? categoryName.textContent : "";
    categoryName.textContent = deleteCategoryText;
    categoryName.style.color = "white";
    categoryName.style.background = "rgb(187 82 82 / 46%)";

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirmButton");
    confirmButton.textContent = "Confirm";
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancelButton");
    cancelButton.textContent = "Cancel";

    categoryName.appendChild(confirmButton);
    categoryName.appendChild(cancelButton);

    confirmButton.addEventListener("click", () => {
      let categoryWrapper = category.parentElement;
      categoryWrapper.removeChild(category);
      saveData();
    });

    cancelButton.addEventListener("click", () => {
      categoryName.textContent = originalCategoryName;
      categoryName.style.backgroundColor = "transparent";
      saveData();
    });
  } else if (!categoryName) {
    alert("Please give a name to your category before deleting it");
  }
}
// This function allows to put back the name of the task after pressing the Cancel button, on deletion.
function addTaskNameToTask(taskName, taskDetails) {
  let task = document.createElement("h3");
  task.classList.add("taskName");
  task.textContent = taskName;

  taskDetails.insertBefore(task, taskDetails.firstChild);
}
// This function allows to put back the date of the task after pressing the Cancel button, on deletion.
function addTaskDateToTask(taskDate, taskDetails) {
  let date = document.createElement("p");
  date.classList.add("taskDate");
  date.textContent = taskDate;

  taskDetails.appendChild(date);
}
// This function determines the date suffix for each date.
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
