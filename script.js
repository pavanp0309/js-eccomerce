// 🚗🛺loading all btn the items when the Browser is loaded
document.addEventListener("DOMContentLoaded",()=>{
    // 1👣.accessing all btn elements when browser is loaded
    let addtocartBtn=document.querySelectorAll(".add-to-cart")
    console.log(addtocartBtn)
    // accessing the cartIcon 
    let cartIcon=document.querySelector(".cart-icon")
    console.log(cartIcon)

    // 🥳adding the Functionalities for all btn elements
     addtocartBtn.forEach(button=>{
        console.log(button)
        button.addEventListener("click",()=>{
            // console.log(button.parentElement.parentElement)
            // gathering all the product inforamtion on btn clicks
            let productInfo=button.parentElement.parentElement;
            let Pname=productInfo.querySelector('.product-title').innerText;
            let Pprice=productInfo.querySelector('.product-price').innerText;
            let Pdes=productInfo.querySelector('.prod-des').innerText;
            let Pimage=productInfo.querySelector('.product-img').src;
             console.table([Pname,Pdes,Pprice,Pimage])

            // creating the Object for selected product 
            let selectedProd={
                title:Pname,
                desc:Pdes,
                price:parseFloat(Pprice.replace(/[^0-9]/g,"")),
                imgUrl:Pimage,
                quantity:1
            }
            // passing all the Product info to addtocart function to check weather items exists
            Addtocart(selectedProd)
        })
     })

    //  🚀🚀adding the Functionalities for cartIcon
    cartIcon.addEventListener("click",()=>{
        window.location.href="cart.html"
    })



})

// array to add selected items
let cartItems=[]

// 🚗🛺function to addtocart : to check weather items exists in the cart 
function Addtocart(product){
    console.log("P",product)
    let existingItems=cartItems.find(item=>item.title===product.title)
    if(existingItems){
        existingItems.quantity++
    }else{
        cartItems.push(product)
    }

    // adding the items to local storage 
    localStorage.setItem("cartitem",JSON.stringify(cartItems))
    handleCartIconTotal()
}


// 🚗🛺function to print cart icon value
function handleCartIconTotal(){
    let cartIconVal=document.querySelector(".cart-icon-value")
    console.log(cartIconVal)
    let cartTotal=cartItems.reduce((total,ele)=>total+ele.quantity,0)
    cartIconVal.textContent=cartTotal;
}



// 🚗🛺 loading all items when the browser is reponed from localstorage
function loadCart(){
    let cartvalues=localStorage.getItem("cartitem")
    if(cartvalues){
        cartItems=JSON.parse(cartvalues)
        handleCartIconTotal()
    }
}

loadCart()

