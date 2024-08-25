// Configuración de Firebase
const firebaseConfig = {
    databaseURL: "https://smarthome2-a24c5-default-rtdb.firebaseio.com/",
    token: "yXmIvdRnL5YGpp3gQL1my1WR3iVf0xqw6izBHoQp"  // Reemplaza con tu token real
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
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Mensaje enviado con éxito');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al enviar el mensaje');
        });
    } else {
        alert('Por favor, completa todos los campos');
    }
}

// Funciones para mostrar y ocultar los submenús
function showSubMenu(menu) {
    const subMenuId = menu + '-menu';
    document.getElementById(subMenuId).style.display = 'block';
}

function hideSubMenu(menu) {
    const subMenuId = menu + '-menu';
    document.getElementById(subMenuId).style.display = 'none';
}

// Asegurarse de que el menú se cierre cuando se haga clic fuera de él
document.addEventListener('click', function(event) {
    const target = event.target;
    if (!target.closest('.menu-item') && !target.closest('.sub-menu')) {
        const subMenus = document.querySelectorAll('.sub-menu');
        subMenus.forEach(subMenu => {
            subMenu.style.display = 'none';
        });
    }
});
