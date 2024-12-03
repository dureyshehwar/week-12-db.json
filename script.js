document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.querySelector('.row');
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        productsContainer.innerHTML = products.map(product => `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
