// Configuración de Firebase
const firebaseConfig = {
    databaseURL: "https://sweet-blossom-7877e-default-rtdb.firebaseio.com/",
    token: "SndNGbyWFNYjL0GEB2DxHF0DRvg4fEJVcHhd9AAM"  // Reemplaza con tu token real
};

// Función para enviar datos a Firebase
function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const data = {
            name: name,
            email: email,
            message: message
        };

        fetch(`${firebaseConfig.databaseURL}/contacts.json?auth=${firebaseConfig.token}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Mensaje enviado con éxito');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            } else {
                alert('Error al enviar el mensaje');
            }
        })
        .catch(error => {
            alert('Error al enviar el mensaje: ' + error.message);
        });
    } else {
        alert('Por favor, completa todos los campos');
    }
}
