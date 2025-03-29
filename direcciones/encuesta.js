const preguntas = [
    { texto: "¿Qué santa se festeja el día de su casamiento?", opciones: ["Santa Catalina de Siena", "Santa Bernardita", "Santa Madre Paula Montal"], correcta: "Santa Madre Paula Montal" },
    { texto: "¿Dónde nació María?", opciones: ["Córdoba, Argentina", "Berlín, Alemania", "Estrasburgo, Francia"], correcta: "Estrasburgo, Francia" },
    { texto: "¿En dónde se conocieron?", opciones: ["En el ruca Champaquí", "A través de Instagram", "En una peregrinación"], correcta: "En una peregrinación" },
    { texto: "¿Quién se confundió de colectivo y terminó en la otra punta de Córdoba por ser colgado?", opciones: ["Meri", "Santi"], correcta: "Meri" },
    { texto: "¿Cuántos hermanos tiene cada uno?", opciones: ["Meri 4 y Santi 5", "Meri 5 y Santi 3", "Meri 5 y Santi 5"], correcta: "Meri 5 y Santi 5" },
    { texto: "¿Qué canción estaba sonando en el momento que Santi le pidió casamiento?", opciones: ["Alma de nogal", "Para los ojos más bellos", "Te lo diré mejor"], correcta: "Te lo diré mejor" },
    { texto: "¿En qué mes se pusieron de novios?", opciones: ["Octubre", "Diciembre", "Noviembre"], correcta: "Noviembre" },
    { texto: "¿Quién de los dos es más desordenado?", opciones: ["Meri", "Santi"], correcta: "Meri" },
    { texto: "¿Hace cuántos años están de novios?", opciones: ["4", "5", "6"], correcta: "5" },
    { texto: "¿De qué posición jugaba María de chica?", opciones: ["Delantera", "Defensora", "Arquera"], correcta: "Arquera" },
    { texto: "¿Quién es más propenso a decir que es docente/profesor para que no le roben?", opciones: ["Meri", "Santi"], correcta: "Santi" },
    { texto: "¿Qué hizo Santi apenas se enteró que era celíaco?", opciones: ["Empezó con la dieta", "Hizo reposo", "Se comió un paquete de galletas Toddy"], correcta: "Se comió un paquete de galletas Toddy" },
    { texto: "¿Qué danza estaban bailando cuando se comprometieron?", opciones: ["Escondido", "Gato", "Zamba"], correcta: "Zamba" },
    { texto: "¿Quién de los dos puede dormir 12 horas seguidas con o sin alarma?", opciones: ["Santi", "Meri"], correcta: "Meri" },
    { texto: "¿Qué día se conocieron Santi y Mery?", opciones: ["26 de agosto", "10 de septiembre", "21 de septiembre", "15 de julio"], correcta: "21 de septiembre" }
];


let respuestas = [];
let indice = 0;

function mostrarPreguntas() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    const bloque = preguntas.slice(indice, indice + 4);

    bloque.forEach((preg, i) => {
        const div = document.createElement("div");
        div.className = "pregunta";
        div.innerHTML = `<h3>${preg.texto}</h3>`;

        const opcionesDiv = document.createElement("div");
        opcionesDiv.className = "opciones";

        preg.opciones.forEach(opcion => {
            const btn = document.createElement("button");
            btn.textContent = opcion;
            btn.addEventListener("click", () => seleccionarOpcion(btn, preg.correcta, preg.texto));
            opcionesDiv.appendChild(btn);
        });

        div.appendChild(opcionesDiv);
        contenedor.appendChild(div);

        setTimeout(() => div.classList.add("mostrar"), i * 100);
    });

    if (indice + 4 >= preguntas.length) {
        document.getElementById("siguiente").style.display = "none";
        document.getElementById("terminar").style.display = "inline-block";
    }
}

function seleccionarOpcion(boton, respuestaCorrecta, preguntaTexto) {
    // Deshabilitar todos los botones
    const botones = boton.parentNode.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);

    // Verificar si la respuesta es correcta
    if (boton.textContent === respuestaCorrecta) {
        boton.style.backgroundColor = "#24492E"; // Respuesta correcta
    } else {
        boton.style.backgroundColor = "#D32F2F"; // Respuesta incorrecta
        // Resaltar la respuesta correcta
        const respuestaCorrectaBtn = Array.from(botones).find(b => b.textContent === respuestaCorrecta);
        respuestaCorrectaBtn.style.backgroundColor = "#24492E";
    }

    // Guardar la respuesta seleccionada
    respuestas.push({ pregunta: preguntaTexto, respuesta: boton.textContent });
}

document.getElementById("siguiente").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    indice += 4;
    document.getElementById("espacioDeParticipante").style.display = "none";
    document.getElementById("anecdotario").style.display="none";
    mostrarPreguntas();
});

document.getElementById("terminar").addEventListener("click", () => {
    console.log(respuestas)
    let participante = document.getElementById("participante").value;


    let data = { participante, respuestas };

    // Llamada a Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbxpRHFSvQF_vV84rBIbyj0k6KDmDRBn7fXX-N1VzeEGOYOPQST9JgwrvHeOtu7FddgHMg/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => window.location.href = "anecdotario.html")
    .catch(error => console.error("Error:", error));

    


});

mostrarPreguntas();
