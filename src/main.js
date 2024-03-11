// Get Elements
const plusIcon = document.getElementById("plus_icon");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

// Events

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
