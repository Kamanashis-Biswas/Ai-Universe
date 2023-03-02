const loadProducts = async() => {
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    const res=await fetch(url);
    const data=await res.json();
    displayProducts(data.data.tools)
    
}

const displayProducts=products=>{
    const productContainer=document.getElementById('product-container');
    products.forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML=`
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        productContainer.appendChild(productDiv);
    })
}



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

