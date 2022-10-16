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
        foundProducts.forEach(product => {
            console.log(product);
        });
    }
})






// return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
//     product.description.toLowerCase().indexOf(value.toLowerCase()) > -1;
