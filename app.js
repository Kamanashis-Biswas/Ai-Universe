const loadProducts = async() => {
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    const res=await fetch(url);
    const data=await res.json();
    displayProducts(data.data.tools)
    
}

const displayProducts=products=>{
    const productContainer=document.getElementById('product-container');
    productContainer.innerHTML='';
    //display 6 product
    products=products.slice(0,6);
    products.forEach(product=>{
        toggleSpinner(true);
        const productDiv=document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML=`
        <div class="card p-2">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                <p class="card-text"><i class="fa-solid fa-calendar-days"></i>${product.published_in}</p>
                <button class="btn btn-light rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(productDiv);
    });
    // stop loader
    toggleSpinner(false);
}

document.getElementById('sort-btn').addEventListener('click',function(){
    console.log("Sort Btn Click");
})

loadProducts();

const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}
