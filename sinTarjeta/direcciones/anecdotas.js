//https://script.google.com/macros/s/AKfycbwQZb_vejgtFrDnsg-SD2rAHwTM-VgOJLKuSnpM9-e4z3wBk8mo9oUsHDyt1wAtoNy3DQ/exec
//anecdota


document.getElementById("enviar").addEventListener("click", () => {
    
    const anecdota = document.getElementById("anecdota").value;
    if (!anecdota){
        window.alert("Anecdota no escrita");
        return;
    }
    // Llamada a Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbwQZb_vejgtFrDnsg-SD2rAHwTM-VgOJLKuSnpM9-e4z3wBk8mo9oUsHDyt1wAtoNy3DQ/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
            anecdota: anecdota,
        }),
    })
    .then(response => response.json())
    .then(window.alert("Anecdota enviada. Gracias!"))
    .catch(error => console.error("Error:", error));

    document.getElementById("anecdota").value= '';

});