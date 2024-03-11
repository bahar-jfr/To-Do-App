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
  tabelBody.innerHTML = ""

  const userObject = {
    id: Date.now(),
    name: taskName.value,
    priority: taskPriority,
    status: taskStatus,
  };

  allInfoArray.push(userObject);

  localStorage.setItem("task", JSON.stringify(allInfoArray));

  taskName.value = "";

  const tasks = JSON.parse(localStorage.getItem("task"));
  tasks.forEach((item) => {
    const row = document.createElement("tr");

    userObjectKeys.forEach((key) => {
      const cell = document.createElement("td");
      if (key === "deadline") {
        cell.innerText = "date";
      } else if (key === "action") {
        cell.innerText = "action";
      } else {
        cell.innerText = item[key];
      }
      row.append(cell);
      console.log(key);
    });

    tabelBody.append(row);
  });

}
