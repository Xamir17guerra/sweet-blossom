// Configura Firebase con los detalles de tu proyecto
const firebaseConfig = {
    apiKey: "SndNGbyWFNYjL0GEB2DxHF0DRvg4fEJVcHhd9AAM",
    authDomain: "sweet-blossom-7877e.firebaseapp.com",
    databaseURL: "https://sweet-blossom-7877e-default-rtdb.firebaseio.com",
    projectId: "sweet-blossom-7877e",
    storageBucket: "sweet-blossom-7877e.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Envía los datos del formulario a Firebase
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    const nuevoComentarioRef = database.ref('comments').push();
    nuevoComentarioRef.set({
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        alert('Gracias por contactarnos, te responderemos pronto.');
        this.reset();
    })
    .catch((error) => {
        console.error("Error al enviar los datos: ", error);
    });
});
