const flashAlert = document.querySelector(".flashAutoDismiss");

if (flashAlert) {
  setTimeout(() => {
    flashAlert.classList.add("fadeOut");
    flashAlert.addEventListener("transitionend", () => flashAlert.remove(), {
      once: true,
    });
  }, 3000);
}
