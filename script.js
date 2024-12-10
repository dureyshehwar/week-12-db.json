//document.addEventListener('DOMContentLoaded', async () => {
   /////
///////});
document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.querySelector('.row');
    const form = document.querySelector('#productForm'); // Assuming there's a form with this ID

    // Function to fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            productsContainer.innerHTML = products.map(product => `
                <div class="col-md-4" data-id="${product.id}">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" />
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                            <button class="btn btn-danger delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to handle form submission and add new product
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const newProduct = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image')
        };

        try {
            await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            form.reset();
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Function to handle product deletion
    productsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productElement = event.target.closest('.col-md-4');
            const productId = productElement.getAttribute('data-id');

            try {
                await fetch(`http://localhost:3000/products/${productId}`, {
                    method: 'DELETE'
                });
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    });

    // Initial fetch of products
    fetchProducts();
});
