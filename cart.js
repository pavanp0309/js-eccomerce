// loading all the Items in the cart when Browser is loaded 
document.addEventListener("DOMContentLoaded",()=>{
    loadCart()
})


let cartItems=[]

function loadCart(){
    let cartvalues=localStorage.getItem("cartitem")
    if(cartvalues){
        cartItems=JSON.parse(cartvalues)
        // function to update cartUi 
        updateCartUi()
        handleCartIconTotal()

    }
}

function updateCartUi(){
    let cartContainer=document.querySelector(".cart")
    cartContainer.innerHTML=''

    // displaying all the items added in cart dynamically
    cartItems.forEach(ele=>{
        let cartCard=document.createElement("div")
        cartCard.className='col-12 col-sm-12 col-md-3 col-lg-3 '
        cartCard.innerHTML=`   <div class="card shadow product " >
                <img src=${ele.imgUrl} class=" product-img" alt="...">
                <div class="card-body product-info">
                  <h5 class="card-title product-title">${ele.title}</h5>
                  <p class="card-text prod-des">${ele.desc}</p>
                  <p class="card-text product-price">RS ${ele.price}</p>
                  <!-- quantity-container -->
                  <div class="quantity-container">
                    <button class="btn btn-danger decrement">-</button>
                    <span class="quantity">${ele.quantity}</span>
                    <button class="btn btn-success increment">+</button>
                    <!-- delete -->
                    <button class="btn btn-warning delete-btn">delete</button>
                  </div>
                </div>
              </div>`

        // access increment decrement and quantity delete to apply the Functionalities 
        let incrementBtn=cartCard.querySelector(".increment")
        let decrementBtn=cartCard.querySelector(".decrement")
        let deleteBtn=cartCard.querySelector(".delete-btn")
        let Qval=cartCard.querySelector(".quantity")

        // adding the Functionalities 
        incrementBtn.addEventListener("click",function(){
            handleIncrement(ele,Qval)
        })
        decrementBtn.addEventListener("click",()=>{
            handleDecrement(ele,Qval)
        })
        deleteBtn.addEventListener("click",()=>{
            handleDelete(ele)
        })





        // appending the child
        cartContainer.appendChild(cartCard)
    })
    handleCartTotal()

}


// function to handleIncrement
function handleIncrement(ele,Qval){
    ele.quantity++
    Qval.innerText=ele.quantity
    // updating the Localstorage
    localStorage.setItem("cartitem",JSON.stringify(cartItems))
    handleCartTotal()
}

// function to handledecrement
function handleDecrement(ele,Qval){
    if(ele.quantity>1){
        ele.quantity--
        Qval.innerText=ele.quantity
        // updating the Localstorage
        localStorage.setItem("cartitem",JSON.stringify(cartItems))
        handleCartTotal()
    }
}

// function to handledelete
function handleDelete(ele){
   cartItems=cartItems.filter(item=>item.title!==ele.title)
   // updating the Localstorage
   localStorage.setItem("cartitem",JSON.stringify(cartItems))
   updateCartUi()
   handleCartTotal()

}

// function to handleClearAll
function handleClearAll(){
    cartItems.splice(0)
    localStorage.clear()
    updateCartUi()
    handleCartTotal()
}


// function to handleTotal
function handleCartTotal(){
    let cartTotalVal=document.querySelector(".cart-total")
    console.log(cartTotalVal)
    let cartTotal=cartItems.reduce((total,ele)=>total+ele.quantity*ele.price,0)
    cartTotalVal.textContent=`TOTAL :${cartTotal}`
   
}


// 🚗🛺function to print cart icon value
function handleCartIconTotal(){
    let cartIconVal=document.querySelector(".cart-icon-value")
    console.log(cartIconVal)
    let cartTotal=cartItems.reduce((total,ele)=>total+ele.quantity,0)
    cartIconVal.textContent=cartTotal;
}


