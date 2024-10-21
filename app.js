$url = `http://localhost:8080/api/v1/products`;
$post = 'POST';
$delete = 'DELETE';

window.onload = () => {
    console.log('Cargando...');
    getProducts();
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const $name = document.getElementById('productName').value;
    const $price = document.getElementById('productPrice').value;
    parseInt($price);
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

function addProduct($name, $price){
    $url = $url+'/'+'insert';
    fetch($url,{
        method: $post,
        mode: 'no-cors', 
        body: JSON.stringify({
            name: $name,
            price: $price
        }),
    }).then((data) => {
        console.log(data);
        getProducts();
    }).catch((error) => {
        console.log(error);
    });
}

function deleteProduct($id){
    fetch($url +'/delete/' + $id, {
        method: $delete
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
        $cardPrice.textContent = element.productPrice;
        //BORRADO
        const $cardButton = document.createElement('button');
        $cardButton.classList.add('button');
        $cardButton.textContent = 'Delete';
        $cardButton.addEventListener('click', () => {
            deleteProduct(element.productId);
            $products = getProducts();
            renderProducts($products);
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