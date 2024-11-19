document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const gridwall = document.getElementById('gridwall');
            let productHTML = '';
            products.forEach((product, index) => {
                if (index % 5 === 0) productHTML += '<div class="row">';
                productHTML += `
                    <div class="product">
                        <h2>${product.name}</h2>
                        <p>Category: ${product.category}</p>
                        <p>Price: $${product.price}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                if ((index + 1) % 5 === 0) productHTML += '</div>';
            });
            gridwall.innerHTML = productHTML;

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    let cartCount = parseInt(document.getElementById('cart-count').textContent);
                    document.getElementById('cart-count').textContent = ++cartCount;
                });
            });
        });
});
