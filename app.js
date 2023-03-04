let n=6;
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
    loadProducts({sort:true,n});
})

document.getElementById('btn-show-all').addEventListener('click',function(){
    n=12;
    loadProducts({n:12});
})

loadProducts({n:6});



const loadProductDetails = async id => {;
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayProductDetails(data.data);
}

const displayProductDetails=product=>{
    console.log(product);
    
    const productDetails=document.getElementById('product-details');
    productDetails.innerHTML=`
    <div class="d-flex flex-column flex-md-row gap-4">
        <div class="p-3 rounded border bg-light">
            <h5 class="modal-title">${product.description ? product.description : 'No Description Found'}</h5>
            <div class="d-flex flex-column flex-md-row  gap-3 mt-4">
                <div class="p-4 bg-white rounded text-center text-success">
                    <p class="m-0 fw-bold">${product.pricing[0].price}</p>
                    <p class="m-0 fw-bold">${product.pricing[0].plan}</p>
                </div>
                <div class="p-4 bg-white rounded text-center text-warning">
                    <p class="m-0 fw-bold">${product.pricing[1].price}</p>
                    <p class="m-0 fw-bold">${product.pricing[1].plan}</p>
                </div>
                <div class="p-4 bg-white rounded text-center text-danger">
                    <p class="m-0 fw-bold">${product.pricing[2].price}</p>
                    <p class="m-0 fw-bold">${product.pricing[2].plan}</p>
                </div>
            </div>
            <div class="d-flex flex-column flex-md-row gap-4 mt-4">
                <div>
                    <h5 class="modal-title fw-bold">Features</h5>
                    <ul>
                        <li>${product.features[1].feature_name}</li>
                        <li>${product.features[2].feature_name}</li>
                        <li>${product.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h5 class="modal-title fw-bold">Integration</h5>
                    <ul>
                    ${product.integrations.map(e=>('<li>'+e+'</li>')).join().replaceAll(',','')}
                    </ul>
                </div>
                    
            </div>
        </div>
        <div class="p-3 rounded border">
            <div style="position: relative;text-align: center;">
                <img class="img-fluid" src="${product.image_link[0]}" alt="">
                <div style="position: absolute;top: 8px;right: 16px;" class="bg-danger text-white rounded px-2">Accuracy ${product.accuracy.score ? product.accuracy.score :'No Found'}</div>
            </div>
            <h5 class="modal-title text-center mt-4">${product.input_output_examples[0].input}</h5>
            <p class="modal-title text-center mt-4">${product.input_output_examples[0].output ? product.input_output_examples[0].output :'No Data Found'}<p>
        </div>
    </div>
   
    `;
}
