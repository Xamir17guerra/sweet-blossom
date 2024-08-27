// Configuración de Firebase
const firebaseConfig = {
    databaseURL: "https://smarthome2-a24c5-default-rtdb.firebaseio.com/",
    token: "yXmIvdRnL5YGpp3gQL1my1WR3iVf0xqw6izBHoQp"
};

// Función para enviar datos a Firebase (Contacto)
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
        alert('Por favor, complete todos los campos.');
    }
}

// Función para mostrar submenú
function showSubMenu(menuId) {
    document.querySelectorAll('.sub-menu').forEach(menu => menu.style.display = 'none');
    document.getElementById(`${menuId}-menu`).style.display = 'block';
}

// Función para ocultar submenú
function hideSubMenu(menuId) {
    document.getElementById(`${menuId}-menu`).style.display = 'none';
}

// Función para calcular el total
function calculateOrderTotal() {
    let total = 0;
    const prices = {
        'order-cookies-mm': 1,
        'order-cookies-banana': 1,
        'order-cookies-golden': 1,
        'order-muffin-chocolate': 1,
        'order-muffin-vainilla': 1,
        'order-dulce-limon': 1,
        'order-jugo-naranja': 0.5
    };

    for (const [id, price] of Object.entries(prices)) {
        const quantity = parseInt(document.getElementById(id).value) || 0;
        total += quantity * price;
    }

    document.getElementById('order-total').innerText = `Total: $${total.toFixed(2)}`;
}

// Función para enviar orden
function submitOrder() {
    const name = document.getElementById('order-name').value;
    const order = {
        cookiesMM: parseInt(document.getElementById('order-cookies-mm').value) || 0,
        cookiesBanana: parseInt(document.getElementById('order-cookies-banana').value) || 0,
        cookiesGolden: parseInt(document.getElementById('order-cookies-golden').value) || 0,
        muffinChocolate: parseInt(document.getElementById('order-muffin-chocolate').value) || 0,
        muffinVainilla: parseInt(document.getElementById('order-muffin-vainilla').value) || 0,
        dulceLimon: parseInt(document.getElementById('order-dulce-limon').value) || 0,
        jugoNaranja: parseInt(document.getElementById('order-jugo-naranja').value) || 0
    };

    if (name) {
        const orderData = {
            name: name,
            order: order,
            timestamp: new Date().toISOString()
        };

        fetch(`${firebaseConfig.databaseURL}/orders.json?auth=${firebaseConfig.token}`, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Orden enviada con éxito');
            document.querySelectorAll('.order-form input').forEach(input => input.value = 0);
            document.getElementById('order-name').value = '';
            calculateOrderTotal();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al enviar la orden');
        });
    } else {
        alert('Por favor, ingrese su nombre.');
    }
}

// Inicialización
document.querySelectorAll('.order-form input').forEach(input => input.addEventListener('input', calculateOrderTotal));

