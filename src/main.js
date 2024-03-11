const allInfoArray = [];

// Get Elements
const plusIcon = document.getElementById("plus_icon");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const submitBtn = document.getElementById("submit_btn");

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
  
    const userObject = {
      id: Date.now(),
      name: taskName.value,
      priority: taskPriority,
      status: taskStatus,
    };
  
    allInfoArray.push(userObject);
  
    localStorage.setItem("task", JSON.stringify(allInfoArray));
  
    taskName.value = "";
  }

  const tasks = JSON.parse(localStorage.getItem("task"));
  tasks.forEach(item => {
    
  });
  