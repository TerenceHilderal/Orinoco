
function createElement(element){
    return document.createElement(element);
}


function append(parent,el) {
    return parent.appendChild(el)
    
}

// recuperation de l'id dans l'url
const urlParams = new URLSearchParams(window.location.search)
let idTeddies = urlParams.get("id")



let choosenProduct = document.querySelector("#choosenProduct")



fetch("http://localhost:3000/api/teddies/"+ idTeddies )

.then ( response => response.json())
.then ( function(data){
    let teddy = data

    // CREATION DES DIV QUI VONT CONTENIR LES ELEMENTS

    let divCol4 = createElement("div")
    divCol4.classList.add("col-4")

    let divCol8 = createElement("div")
    divCol8.classList.add("col-8")
    divCol8.classList.add("d-flex")
    divCol8.classList.add("flex-column")
    
    // CREATION DES ELEMENTS
    let teddyName = createElement("h2")
        teddyName.innerHTML = teddy.name
        teddyName.classList.add("teddyName")

        teddyPrice = createElement ("span")
        teddyPrice.innerHTML = "Price : " +" " + teddy.price/100 + " $"
        teddyPrice.classList.add("teddyPrice")


        teddyDescription = createElement("p")
        teddyDescription.innerHTML = "Description :" +" " + teddy.description
        teddyDescription.classList.add("teddyDescription")

        teddyImage = createElement("img")
        teddyImage.src = teddy.imageUrl
        teddyImage.classList.add("teddyImg")
    
        teddyLabel = createElement("label")
        teddyLabel.innerHTML = "Colors : "
        teddyLabel.setAttribute("for","color")

        teddySelect = createElement("select")
        teddySelect.setAttribute("id","liste")
        
        for (let i = 0; i < teddy.colors.length; i++) {

            var option = createElement("option")
            var teddyColors = teddy.colors [i];
            option.setAttribute("value",teddyColors)
            option.innerHTML = teddyColors
            append(teddySelect,option)
            
        }


        //RETURN BUTTON

        returnLink = createElement ("a")
        returnLink.classList.add("returnLink")
        returnLink.innerHTML = "Previous"
        returnLink.setAttribute("href","index.html")
        

        //SELECT QUANTITY

        labelQt = createElement("label")
        labelQt.setAttribute("for","qt")
        labelQt.innerHTML = "Quantity  : "

        qtSelect = createElement("select")
        qtSelect.setAttribute("id","qt")
        qtSelect.classList.add("qtSelect")
        
        
    for (let i = 1; i < 6 ; i++) {
        let qtChoice = createElement("option") ;
        qtChoice.textContent = i
        qtChoice.value = i
        qtChoice.setAttribute("value", "quantity")
        append(qtSelect,qtChoice) 
    }

    // ADD BUTTON

    addButton = createElement("button")
    addButton.classList.add("btn")
    addButton.classList.add("btn-outline-dark")
    addButton.classList.add("add-cart")
    addButton.setAttribute("onclick" , "toggle_text()")
    addButton.innerHTML = "Add to cart"

    // APPEND DES ELEMENTS CREE A LA DIV QUI DOIT LES ACCUEILLIR
    append(choosenProduct,divCol4)
    append(divCol4,teddyImage)
    append(divCol4,returnLink)

    // APPEND COL 8
    append(choosenProduct,divCol8)
    append(divCol8,teddyName)
    append(divCol8,teddyDescription)
    append(divCol8,teddyPrice)
    append(divCol8,teddyLabel)
    append(teddyLabel,teddySelect)
    append(divCol8,labelQt)
    append(divCol8,qtSelect)
    append(divCol8,addButton)



    // FUNCTIONS FOR ADDING CONTENT TO CART


    function toggle_text() {
            var span = document.getElementById("span_txt");
        if(span.style.display == "none") {
             span.style.display = "inline";
        } else {
             span.style.display = "none";
        }
    }
    

    addButton.addEventListener("click", ()=>{

        let cart = [];

        let objectTeddy = JSON.stringify({
            name : teddy.name,
            description : teddy.description,
            price : teddy.price,
            color : teddy.color,
            img : teddy.imageUrl
        })

    
        cart.push(objectTeddy)

        console.log(cart);

        
        localStorage.setItem("Teddy",cart)

        localStorage.getItem("Teddy")

        
        
        toggle_text()

        
            
    }) 
    
        
        
        
    

    
       
    
    
})
    
