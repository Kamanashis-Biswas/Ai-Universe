const loadProducts = async() => {
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    const res=await fetch(url);
    const data=await res.json();
    displayProducts(data.data.tools)
    
}

const displayProducts=products=>{
    const productContainer=document.getElementById('product-container');
    productContainer.innerHTML='';
    products.slice(0,6).forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML=`
        <div class="card p-2">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <hr>
                <div class="d-flex justify-content-between align-items-cente">
                <p class="card-text"><i class="fa-solid fa-calendar-days"></i>${product.published_in}</p>
                <button class="btn btn-light rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(productDiv);
    })
}

document.getElementById('sort-btn').addEventListener('click',function(){
    console.log("Sort Btn Click");
})



loadProducts();

// const showData = (data) => {
//     // console.log(data.data.tools)
//     // for(let singleData of data.data.tools.slice(0,6)){
//     //     console.log(singleData);
//     // }
//     const productContainer=document.getElementById('product-info');
//     data.data.tools.slice(0, 6).forEach((product) => {
//         console.log(product.image)
//        const div=document.createElement('div')
//        div.innerHTML=`
//        <div class="row row-cols-1 row-cols-md-2 g-4">
//        <div class="col">
//            <div class="card">
//                <img src="${product.image}" class="card-img-top" alt="...">
//                <div class="card-body">
//                    <h5 class="card-title">Card title</h5>
//                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
//                        to additional content. This content is a little bit longer.</p>
//                </div>
//            </div>
//        </div>
//    </div>
//        `;
//        productContainer.appendChild(div);
//     });

// };

