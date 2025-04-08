var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var ProductDiscriptionInput = document.getElementById('ProductDiscription');
var productImgInput = document.getElementById('productImg');
var productSearchInput = document.getElementById('search');
var addbtn = document.getElementById('add');
var updatebtn = document.getElementById('update');

var productList = [];
var myIndex;
if (localStorage.getItem('product') == null){
    productList=[];
}
else {
    productList = JSON.parse(localStorage.getItem('product'));
    display();
}
function addProduct(){
    var product = {
        code:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:ProductDiscriptionInput.value,
        image:`img/${productImgInput.files[0]?.name}`,
    }
    productList.push(product);
    localStorage.setItem('product', JSON.stringify(productList));
    console.log(productList);
    display();
    cleer();
}
 function display(){
    var cartona = "";
    for (var i=0 ; i<productList.length ; i++){
        cartona +=`<div class="col-md-3">
          <div class="item">
            <img src="${productList[i].image}">
            <h2 class="h4"> Name : ${productList[i].code} </h2>
            <p> Price : ${productList[i].price}</p>
            <p>Category : ${productList[i].category}</p>
            <p>Description : ${productList[i].description} </p>
            <button onclick="deleteProduct(${i})" class="btn btn-danger w-100">Delete<i class="fa fa-trash"></i></button>
            <button onclick="edit(${i})" class="btn btn-warning w-100 my-2">Update <i class="fa fa-pen"></i></button>
          </div>
        </div>`
 }
 document.getElementById("my-row").innerHTML = cartona 
 }

 function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(productList));
    display();
}
function search() {
    var word = productSearchInput.value.toLowerCase();
    var cartona = "";

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].code.toLowerCase().includes(word)) {
            cartona += `
                <div class="col-md-3">
                    <div class="item">
                        <img src="${productList[i].image}">
                        <h2 class="h4">Name: ${productList[i].code}</h2>
                        <p>Price: ${productList[i].price}</p>
                        <p>Category: ${productList[i].category}</p>
                        <p>Description: ${productList[i].description}</p>
                        <button onclick="deleteProduct(${i})" class="btn btn-danger w-100">Delete <i class="fa fa-trash"></i></button>
                        <button  class="btn btn-warning w-100 my-2">Update <i class="fa fa-pen"></i></button>
                    </div>
                </div>
            `;
        }
    }

    if (cartona === "") {
        document.getElementById("my-row").innerHTML = `
            <h2 class="bg-dark text-white text-center p-3 rounded-2">No product found</h2>
        `;
    } else {
        document.getElementById("my-row").innerHTML = cartona;
    }
}

function edit(index){
    myIndex = index
    productNameInput.value = productList[index].code;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    ProductDiscriptionInput.value = productList[index].description;
    addbtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");
}

function updateProduct(index){
    productList[myIndex].code = productNameInput.value;
    productList[myIndex].price = productPriceInput.value;
    productList[myIndex].category = productCategoryInput.value;
    productList[myIndex].description = ProductDiscriptionInput.value;
    localStorage.setItem ('product', JSON.stringify(productList));
    display(productList)
    addbtn.classList.remove("d-none");
    updatebtn.classList.add("d-none");
}
function cleer (){
    productNameInput.value =null,
    productPriceInput.value =null,
    productCategoryInput.value =null,
    ProductDiscriptionInput.value =null,
    productImgInput.value =null;
}