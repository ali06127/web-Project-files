const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    formMessage.style.color = "green";
    formMessage.textContent = "Thank you! We'll get back to you soon.";
    form.reset();
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
  }

  setTimeout(() => {
    formMessage.textContent = "";
  }, 3000);
});

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
