const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>showData(data))
    .catch(err=>console.log(err))
}

const showData=(data)=>{
   // console.log(data.data.tools)
    // for(let singleData of data.data.tools.slice(0,6)){
    //     console.log(singleData);
    // }
    data.data.tools.splice(0,6).forEach((product)=>{
        console.log(product);
    })

};

loadData();