const allInfoArray = [];
const userObjectKeys = ["name", "priority", "status", "deadline", "action"];

// Get Elements
const plusIcon = document.getElementById("plus_icon");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const submitBtn = document.getElementById("submit_btn");
const tabelBody = document.getElementById("table_body");

// Events
submitBtn.addEventListener("click", addNewTask);

// Open modal
plusIcon.addEventListener("click", openModal);
function openModal() {
  modal.style.display = "block";
  overlay.style.display = " block";
}

// Close modal
overlay.addEventListener("click", closeModal);
function closeModal() {
  overlay.style.display = "none";
  modal.style.display = "none";
}

// Add new task's data to localstorage
function addNewTask() {
  const taskName = document.getElementById("task_name");
  const taskPriority = document.getElementById("task_priority").value;
  const taskStatus = document.getElementById("task_status").value;
  let div;

  // Reset the table bode
  tabelBody.innerHTML = "";

  const userObject = {
    id: Date.now(),
    name: taskName.value,
    priority: taskPriority,
    status: taskStatus,
  };

  allInfoArray.push(userObject);

  localStorage.setItem("task", JSON.stringify(allInfoArray));

  // Reset input
  taskName.value = "";

  const tasks = JSON.parse(localStorage.getItem("task"));

  // Create tr
  tasks.forEach((item) => {
    const row = document.createElement("tr");
    // Create td
    userObjectKeys.forEach((key) => {
      const cell = document.createElement("td");
      cell.className = "border-2 py-3 w-1/5 text-center relative";

      if (key === "deadline") {
        cell.innerText = "date";
      } else if (key === "action") {
        cell.className = "flex justify-center  py-3 gap-2";
        createActions(cell);
      } else if (key === "name") {
        cell.innerText = item[key];
      } else {
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
function createActions(cell) {
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

  eyeDiv.append(eyeIcon);
  editDiv.append(editIcon);
  trashDiv.append(trashIcon);
  cell.append(trashDiv, editDiv, eyeDiv);
}
