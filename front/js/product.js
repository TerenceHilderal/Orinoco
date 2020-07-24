

const createElement = element => document.createElement(element)
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el)
    })
}
const append = (parent, el) => parent.appendChild(el)


// recover the id in the url
const urlParams = new URLSearchParams(window.location.search)
let idTeddies = urlParams.get("id")

// recover the div i need
const choosenProduct = document.querySelector("#choosenProduct")
const numberArticle = document.getElementById("numberArticle")

// init teddy variable which will contain the fetch's datas
let teddy = null;

// function to go back to home page
const previousFunction = () => window.location = ("../index.html" + "#ourProducts")
// init de la cart
let cart = [];


// function add to cart
const addTocart = () => {
    const teddyAdd = {
        id: teddy._id,
        name: teddy.name,
        image: teddy.imageUrl,
        description: teddy.description,
        color: teddy.colors[0],
        price: teddy.price,
    }
    cart = [...cart, teddyAdd];

    localStorage.setItem("cart", JSON.stringify(cart))

    numberArticle.innerHTML = cart.length
    Swal.fire({
        title: 'Your product has been added',
        icon: 'success',
        html: '<a href ="./cart.html">Acces your cart by clicking here</a><br><br> <a href =../index.html#ourProducts>Or go back to home page</a>',
        showCloseButton: true,
        showConfirmButton: false
    })
}
// when we came back to a page product : 
const checkStorage = localStorage.getItem("cart")
const checkStorageParse = JSON.parse(localStorage.getItem("cart"))

// if there is something in my storage i put it in my cart
if (checkStorage) {
    cart = [...checkStorageParse]
    numberArticle.innerHTML = cart.length
} else {
    choosenProduct.innerHTML = " <h3 class = error> Sorry , can't add your product to your cart, please try again later</h3"
}

const fetchById = () => {
    fetch("http://localhost:3000/api/teddies/" + idTeddies)
        .then(response => response.json())
        .then(function (data) {
            teddy = data

            const divCol4 = createElement("div")
            classElement(divCol4, ["col-lg-4"])

            const divCol8 = createElement("div")
            classElement(divCol8, ["col-lg-8", "d-flex", "flex-column"])

            divButtons = createElement("div")

            // ELEMENT CREATION
            let teddyName = createElement("h2")
            teddyPrice = createElement("span")
            teddyDescription = createElement("p")
            teddyImage = createElement("img")
            teddyLabel = createElement("label")
            teddySelect = createElement("select")
            previousButton = createElement("button")
            addButton = createElement("button")

            // // INNER
            teddyName.innerHTML = teddy.name
            teddyPrice.innerHTML = "Price : " + " " + teddy.price / 100 + " $"
            teddyDescription.innerHTML = "Description :" + " " + teddy.description
            teddyImage.src = teddy.imageUrl
            teddyLabel.innerHTML = "Colors : "
            previousButton.innerHTML = "Previous"
            addButton.innerHTML = "Add to cart"

            // MODIF DES CLASSES
            classElement(divButtons, ["divButtons"])
            classElement(teddyName, ["teddyName"])
            classElement(teddyPrice, ["teddyPrice"])
            classElement(teddyDescription, ["teddyDescription"])
            classElement(addButton, ["btn", "btn-outline-dark", "add-cart"])
            classElement(teddyImage, ["teddyImg"])
            classElement(previousButton, ["btn", "btn-outline-dark", "returnLink"])

            // AJOUT ATTRIBUTS
            teddyLabel.setAttribute("for", "color")
            classElement(teddySelect, ["selectColor"])
            previousButton.setAttribute("href", "index.html")


            for (let i = 0; i < teddy.colors.length; i++) {
                let option = createElement("option")
                let teddyColors = teddy.colors[i];
                option.setAttribute("value", teddyColors)
                option.innerHTML = teddyColors
                append(teddySelect, option)
            }

            // APPEND DES ELEMENTS CREE A LA DIV QUI DOIT LES ACCUEILLIR
            append(choosenProduct, divCol4)
            append(divCol4, teddyImage)

            // APPEND COL 8
            append(choosenProduct, divCol8)
            append(divCol8, teddyName)
            append(divCol8, teddyDescription)
            append(divCol8, teddyPrice)
            append(divCol8, teddyLabel)
            append(teddyLabel, teddySelect)
            append(divCol8, divButtons)
            append(divButtons, previousButton)
            append(divButtons, addButton)

            // FUNCTION FOR ADDING CONTENT TO CART
            addButton.addEventListener("click", () => {
                try {
                    addTocart()
                } catch (error) {
                    choosenProduct.innerHTML = "<h3 class = error> <b><i> Sorry , something has gone wrong please try again later </h3>"
                }
            })
            // FUNCTION PREVIOUS

            previousButton.addEventListener("click", () => {
                previousFunction()
            })

        }).catch((error) => {
            if (idTeddies.length != 24 || idTeddies === undefined || idTeddies != urlParams) {
                choosenProduct.innerHTML = "<h3 class = error><b><i> Sorry , the selected product does not exist , please came back to home page and try an other product</h3>"
            }
        })
}
try {
    fetchById()
} catch (error) {
    choosenProduct.innerHTML = " <h3 class = error><b><i>!!!!SORRY WE HAVE A PROBLEM IN OUR ATTEMPT TO CONNECT TO THE SERVER,PLEASE TRY AGAIN LATER...</h3>"
}

