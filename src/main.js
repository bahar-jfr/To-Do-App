// Get Elements
const plusIcon = document.getElementById("plus_icon");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const submitBtn = document.getElementById("submit_btn");

// Events
submitBtn.addEventListener("click", addNewTask);

function addNewTask() {
  const taskName = document.getElementById("task_name").value;
  const taskPriority = document.getElementById("task_priority").value;
  const taskStatus = document.getElementById("task_status").value;
}

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
