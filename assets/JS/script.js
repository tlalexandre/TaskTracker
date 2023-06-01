function createForm() {
  // Create a form to fill.
  let form = document.createElement("form");
  let taskCreation = document.querySelector(".taskCreation");

  let selectedCategory = null;

  form.classList.add("taskForm");
  form.classList.add("boxShadows");
  form.classList.add("gradientConvexe");
  taskCreation.appendChild(form);

  let nameWrapper = document.createElement("div");
  nameWrapper.classList.add("nameWrapper");
  nameWrapper.classList.add("boxShadows");
  nameWrapper.classList.add("gradientConvexe");
  form.appendChild(nameWrapper);

  let nameText = document.createElement("h2");
  nameText.classList.add("nameText");
  nameText.textContent = "Name";
  nameWrapper.appendChild(nameText);

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
  form.appendChild(dateWrapper);

  let dateText = document.createElement("h2");
  dateText.classList.add("dateText");
  dateText.textContent = "Date";
  dateWrapper.appendChild(dateText);

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = Date();
  dateInput.classList.add("dateInput");
  dateInput.classList.add("boxShadows");
  dateInput.classList.add("gradientConvexe");
  dateWrapper.appendChild(dateInput);

  let descriptionWrapper = document.createElement("div");
  descriptionWrapper.classList.add("descriptionWrapper");
  descriptionWrapper.classList.add("boxShadows");
  descriptionWrapper.classList.add("gradientConvexe");
  form.appendChild(descriptionWrapper);

  let descriptionText = document.createElement("h2");
  descriptionText.classList.add("descriptionText");
  descriptionText.textContent = "Description";
  descriptionWrapper.appendChild(descriptionText);

  let descriptionInput = document.createElement("textarea");
  descriptionInput.setAttribute("resize", "none");
  descriptionInput.setAttribute("cols", "30");
  descriptionInput.setAttribute("rows", "10");
  descriptionInput.classList.add("descriptionInput");
  descriptionInput.classList.add("boxShadows");
  descriptionInput.classList.add("gradientConcave");
  descriptionWrapper.appendChild(descriptionInput);

  let categoriesPick = document.createElement("div");
  categoriesPick.classList.add("categoriesPick");
  categoriesPick.classList.add("boxShadows");
  categoriesPick.classList.add("gradientConcave");
  form.appendChild(categoriesPick);

  let categoriesPickText = document.createElement("h2");
  categoriesPickText.classList.add("categoriesPickText");
  categoriesPickText.textContent = "Categories";
  categoriesPick.appendChild(categoriesPickText);

  let categoriesPickUl = document.createElement("ul");
  categoriesPickUl.classList.add("categoriesPickUl");
  categoriesPickUl.classList.add("boxShadows");
  categoriesPickUl.classList.add("gradientConcave");
  categoriesPick.appendChild(categoriesPickUl);

  let categories = retrieveCategories();

  categories.forEach(function (category) {
    let categoryLi = document.createElement("li");
    let categoryButton = document.createElement("button");
    categoryLi.appendChild(categoryButton);
    categoryButton.textContent = category;
    categoriesPickUl.appendChild(categoryLi);

    categoryButton.addEventListener("click", function (e) {
      e.preventDefault();
      selectedCategory = category;
    });
  });
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");
  buttonContainer.classList.add("boxShadows");
  buttonContainer.classList.add("gradientConcave");
  form.appendChild(buttonContainer);

  let addTaskButton = document.createElement("button");
  addTaskButton.classList.add("addTaskButton");
  addTaskButton.classList.add("boxShadows");
  addTaskButton.classList.add("gradientConcave");
  addTaskButton.textContent = "Add Task";
  buttonContainer.appendChild(addTaskButton);

  addTaskButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (selectedCategory) {
      let name = taskName.value;
      let date = dateInput.value;
      let description = descriptionInput.value;

      let task = document.createElement("div");
      let taskNameElement = document.createElement("h2");
      let taskDetails = document.createElement("div");
      let taskDate = document.createElement("p");
      let taskDescription = document.createElement("p");

      taskNameElement.textContent = name;
      taskDate.textContent = "Due for: " + (date || "Undefined Date");
      taskDescription.textContent =
        "Description: " + (description || "Undefined Description");

      task.appendChild(taskNameElement);
      taskDetails.appendChild(taskDate);
      taskDetails.appendChild(taskDescription);
      task.appendChild(taskDetails);

      let categoryElement = document.querySelector(`.` + `${selectedCategory}`);
      console.log(categoryElement);
      categoryElement.querySelector("ul").appendChild(task);

      taskName.remove();
      dateInput.remove();
      descriptionInput.remove();
      addTaskButton.remove();
      selectedCategory = null;
      open = false;
    } else {
      alert("Please select a category for the task.");
    }
  });
  let removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("removeTaskButton");
  removeTaskButton.classList.add("boxShadows");
  removeTaskButton.classList.add("gradientConcave");
  removeTaskButton.textContent = "Remove";
  buttonContainer.appendChild(removeTaskButton);

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
let categoriesWrapper = document.querySelector(".categoriesWrapper");

function createCategory() {
  let addCategoryButton = document.createElement("input");
  addCategoryButton.classList.add("addCategory");
  addCategoryButton.classList.add("boxShadows");
  addCategoryButton.classList.add("gradientConcave");
  addCategoryButton.setAttribute("type", "text");
  addCategoryButton.setAttribute("placeholder", "Give a name to your category");
  categoriesWrapper.appendChild(addCategoryButton);

  addCategoryButton.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let titleCategory = addCategoryButton.value;
      let category = document.createElement("div");
      let categoryTitle = document.createElement("h2");
      let categoryUl = document.createElement("ul");

      category.classList.add(`${titleCategory}`);
      category.classList.add(`${titleCategory}`);
      category.classList.add("boxShadows");
      category.classList.add("gradientConcave");

      category.appendChild(categoryTitle);
      category.appendChild(categoryUl);

      categoryTitle.textContent = `${titleCategory}`;
      categoriesWrapper.appendChild(category);
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

function retrieveCategories() {
  let categories = [];
  let categoriesElements = document.querySelectorAll(".categoriesWrapper>div");

  categoriesElements.forEach(function (categoriesElement) {
    let categoryTitle = categoriesElement.querySelector("h2").textContent;
    categories.push(categoryTitle);
  });
  return categories;
}
