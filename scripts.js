// Firebase configuration
const firebaseConfig = {
    apiKey: "SndNGbyWFNYjL0GEB2DxHF0DRvg4fEJVcHhd9AAM",
    authDomain: "sweet-blossom-7877e.firebaseapp.com",
    databaseURL: "https://sweet-blossom-7877e-default-rtdb.firebaseio.com",
    projectId: "sweet-blossom-7877e",
    storageBucket: "sweet-blossom-7877e.appspot.com",
    messagingSenderId: "821489489765",
    appId: "1:821489489765:web:50d52bc112f180b9daf38c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Function to submit the contact form
function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const newContactRef = database.ref('contacts').push();
        newContactRef.set({
            name: name,
            email: email,
            message: message
        })
        .then(() => {
            alert('Mensaje enviado con éxito');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch((error) => {
            alert('Error al enviar el mensaje: ' + error.message);
        });
    } else {
        alert('Por favor, completa todos los campos');
    }
}
