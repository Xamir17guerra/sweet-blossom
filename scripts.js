// Configuración de Firebase
const firebaseConfig = {
    databaseURL: "https://smarthome2-a24c5-default-rtdb.firebaseio.com/",
    token: "yXmIvdRnL5YGpp3gQL1my1WR3iVf0xqw6izBHoQp"
};

// Función para enviar datos del formulario de contacto a Firebase
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

// Función para calcular el total de la orden
function calculateTotal() {
    let total = 0;
    total += document.getElementById('order-galletas').checked ? 1 : 0;
    total += document.getElementById('order-galletas-mm').checked ? 1 : 0;
    total += document.getElementById('order-galletas-banana').checked ? 1 : 0;
    total += document.getElementById('order-muffins').checked ? 1 : 0;
    total += document.getElementById('order-muffins-chocolate').checked ? 1 : 0;
    total += document.getElementById('order-muffins-vainilla').checked ? 1 : 0;
    total += document.getElementById('order-dulce-limon').checked ? 1 : 0;
    total += document.getElementById('order-jugo-naranja').checked ? 0.50 : 0;

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// Función para enviar la orden a Firebase
function submitOrderForm() {
    const orderData = {
        galletas: document.getElementById('order-galletas').checked,
        galletasMm: document.getElementById('order-galletas-mm').checked,
        galletasBanana: document.getElementById('order-galletas-banana').checked,
        muffins: document.getElementById('order-muffins').checked,
        muffinsChocolate: document.getElementById('order-muffins-chocolate').checked,
        muffinsVainilla: document.getElementById('order-muffins-vainilla').checked,
        dulceLimon: document.getElementById('order-dulce-limon').checked,
        jugoNaranja: document.getElementById('order-jugo-naranja').checked,
        total: document.getElementById('total-amount').textContent
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
        // Opcional: Limpiar el formulario de orden
        document.querySelectorAll('.order-form input').forEach(input => input.checked = false);
        document.getElementById('total-amount').textContent = '0.00';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al enviar la orden');
    });
}
