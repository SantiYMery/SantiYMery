document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
  
    // Al finalizar la animación, eliminar el loader
    loader.addEventListener("animationend", () => {
      loader.style.display = "none"; // Ocultar el loader
      var loader2 = document.getElementById("loader");
      loader2.remove();
      var cabecera = document.getElementById("cabecera");
      cabecera.style.display = "block";
      var cuerpo = document.getElementById("cuerpo");
      cuerpo.style.display = "block";
      
    });
  });
  