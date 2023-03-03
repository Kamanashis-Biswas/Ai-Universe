const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
//data load
const loadProducts = async ({sort,n}) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    toggleSpinner(true);
    const res = await fetch(url);
    const data = await res.json();
    toggleSpinner(false);
    let tools=data.data.tools;
    if(sort){
        tools.sort(function (a, b) {
            a = a.published_in.split('/');
            b = b.published_in.split('/');
            return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
    }
    displayProducts(tools,n);

}

const displayProducts = (products,n=6) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    //display 6 product
    products = products.slice(0, n);
    products.forEach(product => {
       
        const productDiv = document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML = `
        <div class="card p-2">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title fw-bold">Features</h5>
            <ol>
               ${product.features.map(e=>('<li>'+e+'</li>')).join().replaceAll(',','')}
               
                
            </ol>
            <hr>
            <h5 class="card-title">${product.name}</h5>
                <div class="d-flex justify-content-between align-items-center">
                <p class="card-text"><i class="fa-solid fa-calendar-days me-2"></i>${product.published_in}</p>
                <button onclick="loadProductDetails('${product.id}')" class="btn btn-light rounded-circle" data-bs-toggle="modal" data-bs-target="#productDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(productDiv);
    });
   
}

document.getElementById('sort-btn').addEventListener('click', function () {
    loadProducts({sort:true});
})

document.getElementById('btn-show-all').addEventListener('click',function(){
    loadProducts({n:12});
})

loadProducts({n:6});



const loadProductDetails = async id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}
