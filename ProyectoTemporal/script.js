document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
  
    // Al finalizar la animación, eliminar el loader
    loader.addEventListener("animationend", () => {
      loader.style.display = "none"; // Ocultar el loader
    });
  });
  