$url = `http://localhost:8080/api/v1/products`;

window.onload = () => {
    console.log('Cargando...');
    getProducts();
}


document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const $name = document.getElementById('productName').value;
    const $price = document.getElementById('productPrice').value;
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    parseFloat($price);
    addProduct($name, $price);
});

function getProducts(){
    fetch($url, {
        method: 'GET'
    })
    .then((response) => {
        if (!response.ok) {
            console.log(response);
            throw new Error('Network Error');
        }
        return response.json();
    })
    .then((data) => {
        let array = data;
        console.log(array);
        renderProducts(array); 
    })
    .catch((error) => {
        console.log('Fetch error:', error); 
    });
}
function addProduct($name, $price) {
    fetch($url + '/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Asegúrate de tener el encabezado
        },
        body: JSON.stringify({
            productName: $name,
            productPrice: $price
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        getProducts();
        return response;
    })
    .then((data) => {
        console.log('Producto agregado:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteProduct($id){
    fetch($url +'/delete/' + $id, {
        method: 'DELETE',
    }).then((data) => {
        console.log(data);
        getProducts();
    }).catch((error) => {
        console.log(error);
    });
    }

function renderProducts(data){
    const $cards = document.getElementById('cards');
    $cards.innerHTML = '';
   
    data.forEach(element => {
        //Tarjeta
        const $card = document.createElement('div');
        $card.classList.add('card');
        //NOMBRE
        const $cardTitle = document.createElement('h3');
        $cardTitle.classList.add('name');
        $cardTitle.textContent = element.productName;
        //PRECIO
        const $cardPrice = document.createElement('p');
        $cardPrice.classList.add('price');
        $cardPrice.textContent = element.productPrice + "€";
        //BORRADO
        const $cardButton = document.createElement('button');
        $cardButton.classList.add('button');
        $cardButton.textContent = 'Delete';
        $cardButton.addEventListener('click', () => {
            deleteProduct(element.productId);
            getProducts();
        });

        //AGREGAR
        $card.appendChild($cardButton);
        $card.appendChild($cardTitle);
        $card.appendChild($cardPrice);
        $cards.appendChild($card);
    });
}


/*Tailwinds
$card.classList.add('flex flex-col items-center p-4 bg-white rounded shadow');

 $cardTitle.classList.add('font-bold font-mono text-lg text-black');
 $cardPrice.classList.add('font-light font-mono text-lg text-black');
 $cardButton.classList.add('font-italic font-mono text-lg text-black', 'hover:text-red-500');
 */