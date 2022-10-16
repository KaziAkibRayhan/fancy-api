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

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (event) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    if (event.key === 'Enter') {
        const value = searchField.value;
        const allProducts = await loadAllProducts();
        spinner.classList.add('hidden');
        const foundProducts = allProducts.filter(product => product.category.includes(value));
        const productsContainer = document.getElementById('products-container');
        const notFound = document.getElementById('not-found');
        productsContainer.innerHTML = '';
        notFound.textContent = '';
        // not found massage
        if (foundProducts.length === 0) {
            // console.log('No found product');
            notFound.innerHTML = `<h2 class="text-2xl text-orange-400 text-center">No found product</h2>`;
            return;
        }
        foundProducts.forEach(product => {
            const { category, image, title, description } = product;
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src="${image}" alt="Shoes" class="h-52 w-full" /></figure>
                <div class="card-body">
                <h2 class="card-title">${category}</h2>
                <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                <div class="card-actions justify-end">
                <label for="my-modal-3" onclick="showModal('${description}','${image}')" class="btn modal-button btn-primary">Show Details</label>
                </div>
                </div>
                </div>
            `;
            productsContainer.appendChild(div);
        });
    }
})

const showModal = (description, image) => {
    // console.log(description, image)
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <p class="py-4">${description}</p>
    <img src="${image}" alt="" />
    `;
}
