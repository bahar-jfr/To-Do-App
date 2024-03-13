const allInfoArray = [];
const userObjectKeys = ["name", "priority", "status", "deadline", "action"];

// Get Elements
const plusIcon = document.getElementById("plus_icon");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const submitBtn = document.getElementById("submit_btn");
const tabelBody = document.getElementById("table_body");
const showTaskModal = document.getElementById("show_task_modal");
const taskName = document.getElementById("task_name");
const taskPriority = document.getElementById("task_priority");
const taskStatus = document.getElementById("task_status");
const headerModal = document.getElementById("header_modal");
const updateBtn = document.getElementById("update_btn");

// Create Elements for eyeIcon's modal
const taskNameDiv = document.createElement("div");
const priorityDiv = document.createElement("div");
const statusDiv = document.createElement("div");
const headerShowModal = document.createElement("div");

// Events
submitBtn.addEventListener("click", addNewTask);

// Open modal
plusIcon.addEventListener("click", openModal);
function openModal() {
  modal.style.display = "block";
  overlay.style.display = " block";
  taskName.value = "";
}

// Close modal
overlay.addEventListener("click", closeModal);
function closeModal() {
  overlay.style.display = "none";
  modal.style.display = "none";
  showTaskModal.style.display = "none";
}

// Add new task's data to localstorage
function addNewTask() {
  const userObject = {
    id: Date.now(),
    name: taskName.value,
    priority: taskPriority.value,
    status: taskStatus.value,
  };

  allInfoArray.push(userObject);

  localStorage.setItem("task", JSON.stringify(allInfoArray));

  // Reset input
  taskName.value = "";
  renderTasks();
}

// Create render function
function renderTasks() {
  // Reset the table bode
  tabelBody.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("task"));
  let div;

  // Create tr
  tasks.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = "border-collapse border-2";
    row.id = item.id;

    // Create td
    userObjectKeys.forEach((key) => {
      const cell = document.createElement("td");
      cell.className = " py-3 w-1/5 text-center relative";

      if (key === "deadline") {
        cell.className = "border-x-2  py-3 w-1/5 text-center relative";
        cell.innerText = "date";
      } else if (key === "action") {
        cell.className = "flex justify-center gap-2 py-3 ";
        createActions(cell, index);
      } else if (key === "name") {
        cell.innerText = item[key];
      } else {
        cell.className = "py-3 w-1/5 text-center relative border-x-2";
        div = document.createElement("div");
        div.innerText = item[key];
        // Set style for option content
        if (item[key] === "Todo" || item[key] === "High") {
          div.className = "bg-pink text-white option ";
        } else if (item[key] === "Medium" || item[key] === "Doing") {
          div.className = "bg-yellow option ";
        } else if (item[key] === "Low") {
          div.className = "bg-light_gray option ";
        } else {
          div.className = "bg-green text-white option";
        }
        cell.append(div);
      }
      row.append(cell);
    });

    tabelBody.append(row);
  });
}

// Create action icons
function createActions(cell, index) {
  const trashDiv = document.createElement("div");
  trashDiv.className = "bg-pink w-fit px-2 py-1  rounded-md";
  const trashIcon = document.createElement("img");
  trashIcon.src = "./assets/images/ion--trash-sharp.svg";

  const editDiv = document.createElement("div");
  editDiv.className = "bg-blue w-fit px-2 py-1  rounded-md ";
  const editIcon = document.createElement("img");
  editIcon.src = "./assets/images/mdi--edit.svg";

  const eyeDiv = document.createElement("div");
  eyeDiv.className = "bg-dark_gray w-fit px-2 py-1  rounded-md ";
  const eyeIcon = document.createElement("img");
  eyeIcon.src = "./assets/images/ion--eye.svg";

  // Add event to icons
  trashDiv.addEventListener("click", () => deleteTask(index));
  eyeDiv.addEventListener("click", () => showTask(index));
  editDiv.addEventListener("click", () => editTask(index));

  eyeDiv.append(eyeIcon);
  editDiv.append(editIcon);
  trashDiv.append(trashIcon);
  cell.append(trashDiv, editDiv, eyeDiv);
}

// Delete from tr and localstorage
function deleteTask(index) {
  allInfoArray.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(allInfoArray));
  renderTasks();
}

// See task info
function showTask(index) {
  headerShowModal.innerHTML = "Show Task";
  taskNameDiv.innerHTML = allInfoArray[index].name;
  priorityDiv.innerHTML = allInfoArray[index].priority;
  statusDiv.innerHTML = allInfoArray[index].status;

  headerShowModal.className =
    "font-semibold text-3xl text-dark_purple mb-8 mt-4";
  taskNameDiv.className =
    "p-2 bg-white border-dark_purple border-2 rounded-md mb-4";
  priorityDiv.className =
    "p-2 bg-white border-dark_purple border-2 rounded-md mb-4";
  statusDiv.className =
    "p-2 bg-white border-dark_purple border-2 rounded-md mb-4";

  showTaskModal.append(headerShowModal, taskNameDiv, priorityDiv, statusDiv);

  overlay.style.display = "block";
  showTaskModal.style.display = "block";
}

// Edit task info
function editTask(index) {
  function updateTask() {
    allInfoArray[index].name = taskName.value;
    allInfoArray[index].priority = taskPriority.value;
    allInfoArray[index].status = taskStatus.value;
    overlay.style.display = "none";
    modal.style.display = "none";
    localStorage.setItem("task", JSON.stringify(allInfoArray));
    // Reset input
    taskName.value = "";
    renderTasks();
  }

  updateBtn.removeEventListener("click", updateTask);
  updateBtn.addEventListener("click", updateTask);

  taskName.value = allInfoArray[index].name;
  taskPriority.value = allInfoArray[index].priority;
  taskStatus.value = allInfoArray[index].status;

  headerModal.innerHTML = "Edit Task";
  overlay.style.display = "block";
  modal.style.display = "block";
  submitBtn.style.display = "none";
  updateBtn.style.display = "block";
}

function editTask(index) {
  // اولین قدم: حذف listener های قبلی
  updateBtn.removeEventListener("click", previousUpdateListener);

  // تابع قبلی update را ذخیره کنید تا بتوانید آن را حذف کنید
  function previousUpdateListener() {
    allInfoArray[index].name = taskName.value;
    allInfoArray[index].priority = taskPriority.value;
    allInfoArray[index].status = taskStatus.value;
    overlay.style.display = "none";
    modal.style.display = "none";
    localStorage.setItem("task", JSON.stringify(allInfoArray));
    // Reset input
    taskName.value = "";
    renderTasks();
  }

  // اضافه کردن listener جدید
  updateBtn.addEventListener("click", previousUpdateListener);

  taskName.value = allInfoArray[index].name;
  taskPriority.value = allInfoArray[index].priority;
  taskStatus.value = allInfoArray[index].status;

  headerModal.innerHTML = "Edit Task";
  overlay.style.display = "block";
  modal.style.display = "block";
  submitBtn.style.display = "none";
  updateBtn.style.display = "block";
}
