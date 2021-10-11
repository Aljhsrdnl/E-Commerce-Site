//Selectors
const menuIcon = document.querySelector(".menu");
const sideBar = document.querySelector(".sidebar");
const cartSide = document.querySelector(".fa-cart-plus");
const cartBar = document.querySelector(".cartSidebar");
var toCart = document.querySelectorAll(".addToCart");
const cartTotal = document.querySelector(".cartTotal");
const checkOutBtn = document.querySelector(".purchase");

//---------------------------Variables------------------------
var i;


//------------------------Sidebar Toggle ------------------------
menuIcon.addEventListener("click", function  () {
    menuIcon.classList.toggle("change");
    sideBar.classList.toggle("sidebar-open")
})

cartSide.addEventListener("click", function() {
    cartBar.classList.toggle("cartSidebar-close");
})
 
var itemsInCart = [];
const emptyCartmsg = document.querySelector(".emptyCart");

// ----------------------- ADD TO CART ------------------------
toCart.forEach(function(item) {
    item.addEventListener("click", function(e) {
        
        const parentDiv = e.target.parentElement;
        const itemDetails = {};
        let fullPath = parentDiv.children[0].src;
        let pos = fullPath.indexOf("pics") + 4;
        let partialPath = fullPath.slice(pos);
        let name = parentDiv.children[2].innerHTML;
        let price = parentDiv.children[3].innerHTML;
        let finalPrice = price.slice (1);
        itemDetails.img = "pics" + partialPath;
        itemDetails.name = name;
        itemDetails.price = finalPrice;

        for (i = 0; i < itemsInCart.length; i++) {
            if (itemsInCart[i] == name) {
                alert("This item is already in your cart!");
                return;
            }
        }

    
        itemsInCart.push(name);
        
        
        checkCartEmpty();

        //--if empty ang cart, display ang message----------
        function checkCartEmpty () {
            if (itemsInCart.length != 0) {
                emptyCartmsg.classList.remove("emptyCart");
                emptyCartmsg.classList.add("notEmpty");
            }
            else {
                emptyCartmsg.classList.add("emptyCart");
                emptyCartmsg.classList.remove("notEmpty");
            }
        }
        


        // CREATING DIV TEMPLATE FOR CART SIDEBAR 
        //PARENT DIV
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cartItem");

        //IMG
        const imgHolder = document.createElement("img");
        imgHolder.classList.add("cartPic");
        imgHolder.src = itemDetails.img;
        cartItemDiv.appendChild(imgHolder);

        //CART DETAILS
        const details = document.createElement("div");
        const productName = document.createElement("p");
        productName.classList.add("cartd", "itemName");
        productName.innerText = itemDetails.name;
        const priceDiv = document.createElement("p");
        priceDiv.classList.add("cartd", "price");
        priceDiv.innerText = "$" + itemDetails.price;
        details.appendChild(productName);
        details.appendChild(priceDiv);
        cartItemDiv.appendChild(details);

        //COUNTER
        const counter = document.createElement("div");
        counter.innerHTML = '<input type="number" class="itemCounter" value="1">';
        cartItemDiv.appendChild(counter);

        //REMOVE BUTTON
        const removeBtn = document.createElement("div");
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        cartItemDiv.appendChild(removeBtn);

        cartBar.insertBefore(cartItemDiv, cartTotal); 




        //-----------------------Removing the button ----------
        var remove = document.querySelectorAll(".fa-trash");
        remove.forEach(function(btn) {
            btn.addEventListener("click", removeItemFromCart)
            checkCartEmpty();
        })

        //-------------------ITEM COUNTER--------------    
        var quantityDiv = document.querySelectorAll(".itemCounter");
        quantityDiv.forEach(function(q) {
            q.addEventListener("change", quantityChanged)
        })

        //---------------UPDATING CART TOTAL-----------------
        updateCartTotal();
        
        function updateCartTotal () {
            var items = document.querySelectorAll(".cartItem");
            var total = 0;
            items.forEach(function(item) {
                var priceElement = item.querySelectorAll(".price")[0];
                var quantityElement = item.querySelectorAll(".itemCounter")[0];
                var price = parseFloat(priceElement.innerText.slice(1));
                 quantity = parseFloat(quantityElement.value);
                total += (price * quantity);
            })
            total = Math.round(total * 100) / 100;
            var totalPriceDisplay = document.querySelector(".totalPrice");
            totalPriceDisplay.innerText = "$ " + total;
        }

        

        function removeItemFromCart(event) {
            const div = event.target;
            const parentDiv = div.parentElement.parentElement;
            const nameDiv = parentDiv.children[1].firstElementChild;
            const itemNameRemoved = nameDiv.innerText;
            parentDiv.remove();
            updateCartTotal();
    
            //-----------DELETE ITEM NAME IN ARRAY-----------

            for ( i = 0; i < itemsInCart.length; i++) {
                if(itemNameRemoved == itemsInCart[i]) {
                    itemsInCart.splice(i, 1);
                }
            }

            checkCartEmpty();

        }
        
        
        function quantityChanged(e) {
            var inputDiv = e.target;
            if (isNaN(inputDiv.value) || inputDiv.value <= 0) {
                inputDiv.value = 1;
            }
            else {
                qr = inputDiv.value;
                updateCartTotal();
            }
        }


        checkOutBtn.addEventListener("click", function() {
            var allDivs = document.querySelectorAll(".cartItem");
            allDivs.forEach(function(item) {
                item.remove();
            })
            for ( i = 0; i < itemsInCart.length; i++) {
                    itemsInCart.splice(i, itemsInCart.length);
            }

            checkCartEmpty();
            updateCartTotal();
            
        })
        
    })

})


























/*for (i = 0; i < toCart.length; i++) {
    toCart[i].addEventListener("click", choose(this))
}

function choose(this) {
    var itemToCart = this.target;
        var getItemName = itemToCart.nextElementSibling; //gets the div of item name
        var itemName = getItemName.innerHTML;
        hello = itemName;
        var divParent = itemToCart.parentNode;
        console.log(itemName);
        console.log(divParent.childNodes[7].innerHTML); //get the item price
} */

/* Hover Effect
items.forEach(function(item) {
    item.addEventListener("mouseover", function(e) {
        var it = e.target;
        it.classList.add("opac");
        var cart = it.nextElementSibling;
        cart.classList.add("price-close");
    })
    item.addEventListener("mouseout", function(e) {
        var it = e.target;
        it.classList.remove("opac");
        var cart = it.nextElementSibling;
        cart.classList.remove("price-close");
    })
})


var plus = document.querySelectorAll(".btn-plus");
        plus.forEach(function(plu) {
            plu.addEventListener("click", function(e) {
                var add = e.target;
                var displayDiv = add.nextElementSibling; //div of item counter
                var getDisplay = displayDiv.innerText; //value of div
                console.log("getDisplay: " + getDisplay);
                var c = Number(getDisplay);
                console.log(c);
                c += 1;
                console.log(c);
                displayDiv.innerHTML = c;
            })
        })

        var minus = document.querySelectorAll(".btn-minus");
        minus.forEach(function (min){
            min.addEventListener("click", function(e) {
                var sub = e.target;
                var displayDiv = sub.previousElementSibling; //div of item counter
                var getDisplay = displayDiv.innerText; //value of div
                var counterD = Number(getDisplay);
                counterD -= 1;
                console.log(counterD);
                displayDiv.innerHTML = counterD; 
            })
        })
        
       // addItem(name);

       */