const loadAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
}

const setAllMenu = async () => {
    // console.log(loadAllProducts())
    // loadAllProducts()
    //     .then(data => console.log(data))

    const data = await loadAllProducts();
    const menu = document.getElementById('all-menu');
    let uniqueCategory = [];
    for (const product of data) {
        // console.log(product)
        if (uniqueCategory.indexOf(product.category) === -1) {
            uniqueCategory.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}<a>`;
            menu.appendChild(li);
        }
    }
    // console.log(uniqueCategory);

}
setAllMenu();
// loadAllProducts()

const searchField = document.getElementById('search-field');

searchField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const value = searchField.value;
        const allProducts = await loadAllProducts();
        const foundProducts = allProducts.filter(product => product.category.includes(value));
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        foundProducts.forEach(product => {
            const { category, image, title } = product;
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src="${image}" alt="Shoes" class="h-52 w-full" /></figure>
                <div class="card-body">
                <h2 class="card-title">${category}</h2>
                <p>${title}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Show Details</button>
                </div>
                </div>
            </div>
            `;
            productsContainer.appendChild(div);
        });
    }
})






// return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
//     product.description.toLowerCase().indexOf(value.toLowerCase()) > -1;
