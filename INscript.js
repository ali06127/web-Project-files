// script.js
const typedText = document.querySelector(".typed-text");
const phrases = ["a Web Developer", "a Designer", "a Freelancer"];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function type() {
  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, letterIndex--);
  } else {
    typedText.textContent = currentPhrase.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex++;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message!");
  this.reset();
});
