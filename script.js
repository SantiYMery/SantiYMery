
 //ID:
 //AKfycby97pwK-smY8-G8lVBRBmmlXYe6CAvcv2lXUiaz-o0tcBZkGJ947LA7QoW-rjN7sufN4w


 //URL
//https://script.google.com/macros/s/AKfycby97pwK-smY8-G8lVBRBmmlXYe6CAvcv2lXUiaz-o0tcBZkGJ947LA7QoW-rjN7sufN4w/exec
 
document.documentElement.setAttribute('data-theme', 'light');

document.addEventListener("DOMContentLoaded", () => {
  const asistenciaBtns = document.querySelectorAll('.asistencia-btn');
  const dietaBtns = document.querySelectorAll('.dieta-btn');
  const checkButton = document.querySelector('.check-button');
  const nombreInput = document.getElementById('nombreYapellido');

  function toggleSelection(buttons, clickedBtn) {
      buttons.forEach(btn => {
          if (btn === clickedBtn) {
              btn.style.backgroundColor = '#8f8f8f';
          } else {
              btn.style.backgroundColor = '#f6f6f9';
          }
      });
  }

  asistenciaBtns.forEach(btn => {
      btn.addEventListener('click', () => toggleSelection(asistenciaBtns, btn));
  });

  dietaBtns.forEach(btn => {
      btn.addEventListener('click', () => toggleSelection(dietaBtns, btn));
  });

  checkButton.addEventListener('click', () => {
      // Obtener valores seleccionados
    const asistenciaSeleccionada = Array.from(asistenciaBtns).find(btn => btn.style.backgroundColor === 'rgb(143, 143, 143)')?.innerText || '';
    const dietaSeleccionada = Array.from(dietaBtns).find(btn => btn.style.backgroundColor === 'rgb(143, 143, 143)')?.innerText || '';
    const nombre = nombreInput.value;


    

    console.log("recargaron las cosaS?")
    
  // Enviar a Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbxWwFG-KJ3TNB9YdnI9hQbwctEKy5hiUCnNK7ybTlerkeTyexRkSV6aUtR1iFlln_uEuw/exec', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            asistencia: asistenciaSeleccionada,
            dieta: dietaSeleccionada
        }),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        }
    })
    .then(response => {
      console.log(response.json())
    })
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));
    
    // Limpiar formulario
    asistenciaBtns.forEach(btn => btn.style.backgroundColor = '#f6f6f9');
    dietaBtns.forEach(btn => btn.style.backgroundColor = '#f6f6f9');
    nombreInput.value = '';
    });
});


function copiarAlias() {
    navigator.clipboard.writeText("santi.mery").then(() => {
        alert('Alias copiado al portapapeles');
    }).catch(err => {
        alert('Error al copiar: ' + err);
    });
}

function copiarAliasRegalo() {
    navigator.clipboard.writeText("santiagourrets.uala").then(() => {
        alert('Alias para el regalo copiado al portapapeles');
    }).catch(err => {
        alert('Error al copiar: ' + err);
    });
}