let title    = document.getElementById("title");
let price    = document.getElementById("price");
let taxes    = document.getElementById("taxes");
let discount = document.getElementById("discount");
let quantity    = document.getElementById("quantity");
let category = document.getElementById("category");
let total    = document.getElementById("total");
let add_btn  = document.getElementById("add-btn");
let ads      = document.getElementById("ads");
let tableData = document.getElementById("tableData");
let view_btn = document.getElementById("view-btn");
let search_category = document.getElementById("search_category");
let search_title = document.getElementById("search_title");
let searchInput = document.getElementById("search-input");
let body = document.getElementById("body");
let mode = "create";
let tem;
let searchMode = "title"
// creating getTotal function 

function getTotal(){
        if(price.value != ""){
            let result = +price.value + +taxes.value + +ads.value - +discount.value; 

            total.innerHTML = result;
        }
}
price.addEventListener('keyup',getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
searchInput.addEventListener("keyup", searchItem);
view_btn,addEventListener('click',()=>{
    body.style.scrollBehavior = "smooth";
})


 /*creating create products function */

 let data;
 if(localStorage.data !=null){
    data = JSON.parse(localStorage.data)
 }else{
    data = [];

 }

 function createProduct(){

    let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      quantity: quantity.value,
      category: category.value.toLowerCase(),
      total: total.innerHTML,
    };
     if (title.value != '' && newProduct.quantity <= 100){
        if (mode === "create") {
          if (newProduct.quantity > 1) {
            for (let i = 0; i < newProduct.quantity; i++) {
              data.push(newProduct);
            }
          } else {
            data.push(newProduct);
          }
        } else {
          data[tem] = newProduct;
          mode = "create";
          quantity.style.display = "block";
        }
     }else {
      title.focus();
      title.placeholder = "write title"

     }

    localStorage.setItem("data", JSON.stringify(data));
    
 clear();
 showData();
 }
  add_btn.addEventListener("click",createProduct);


//   clear inpus 

function clear (){
    title.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    quantity.value = "";
    category.value = "";
    total.innerHTML = "";
    ads.value = "";     

}


//  read data 


function showData(){

    let table = "";
    for(let i = 1; i < data.length; i++){

        table += `
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button id="update" onClick = "update(${i})">update</button></td>
                <td><button id="delete" onClick = "deleteItem(${i})">delete</button></td>
            </tr> 
        `;
        

        tableData.innerHTML = table;
    }

}


showData();

//delete data 

function deleteItem(i){
   data.splice(i,1);
   localStorage.data = JSON.stringify(data);
   showData();
}


// update data 

function update(i) {
       title.value =  data[i].title;
       price.value = data[i].price
       taxes.value = data[i].taxes
       discount.value = data[i].discount
       quantity.style.display = "none"
       category.value = data[i].category; 
       ads.value = data[i].ads;  
       total.innerHTML = data[i].total;
       mode = "update";
       tem  = i;
       getTotal();
       scroll({
        top:0,
        behavior:"smooth"
       })
}



function getSearchMode(id) {
  searchInput.focus()
      if (id == "search_title") {
        searchMode = "title";
        searchInput.placeholder = "search by title";
      } else {
        searchMode = "category";
        searchInput.placeholder = "search by category";
      }
}



function searchItem(e){
    searchValue = e.target.value.toLowerCase();
    if(searchMode == "title"){
      table  = "";
      for(i = 0; i < data.length; i++){
        if(data[i].title.includes(searchValue)){
                 table += `
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button id="update" onClick = "update(${i})">update</button></td>
                <td><button id="delete" onClick = "deleteItem(${i})">delete</button></td>
            </tr> 
        `;

               
        }
      }
    }else {
       table = "";
       for (i = 0; i < data.length; i++) {
         if (data[i].category.includes(searchValue)) {
           table += `
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button id="update" onClick = "update(${i})">update</button></td>
                <td><button id="delete" onClick = "deleteItem(${i})">delete</button></td>
            </tr> 
        `;
         }
       }
    }
     searchInput.value = "";
     showData();
      tableData.innerHTML = table;
}





