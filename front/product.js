

const createElement = element => document.createElement(element)

const append = (parent, el) => parent.appendChild(el)

let span = document.getElementById("numberArticle")


// recuperation de l'id dans l'url
const urlParams = new URLSearchParams(window.location.search)
let idTeddies = urlParams.get("id")

// la div où seront append les produits
let choosenProduct = document.querySelector("#choosenProduct")

// initialisation de la variable teddy qui va contenir les data
let teddy = null;

// init de la cart
let cart = [];

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

    let addedProduct = localStorage.setItem("cart", JSON.stringify(cart))
}
// je verifie si il y a quelque chose dans le local storage :
const checkStorage = localStorage.getItem("cart")
const checkStorageParse = JSON.parse(localStorage.getItem("cart"))

// je verifie le storage pour la mise à jour du panier 

// si il y a quelque chose dedans j'ajoute dans cart le contenu de localStorage
if (checkStorage) {
    cart = [...checkStorageParse]
    span.innerHTML = cart.length
}


fetch("http://localhost:3000/api/teddies/" + idTeddies)

    .then(response => response.json())
    .then(function (data) {
        teddy = data

        // CREATION DES DIV QUI VONT CONTENIR LES ELEMENTS

        const divCol4 = createElement("div")
        divCol4.classList.add("col-4")

        const divCol8 = createElement("div")
        divCol8.classList.add("col-8")
        divCol8.classList.add("d-flex")
        divCol8.classList.add("flex-column")
        divButtons = createElement("div")


        // CREATION DES ELEMENTS
        let teddyName = createElement("h2")
        teddyPrice = createElement("span")
        teddyDescription = createElement("p")
        teddyImage = createElement("img")
        teddyLabel = createElement("label")
        teddySelect = createElement("select")
        previousButton = createElement("button")
        addButton = createElement("button")

        // INNER
        teddyName.innerHTML = teddy.name
        teddyPrice.innerHTML = "Price : " + " " + teddy.price / 100 + " $"
        teddyDescription.innerHTML = "Description :" + " " + teddy.description
        teddyImage.src = teddy.imageUrl
        teddyLabel.innerHTML = "Colors : "
        previousButton.innerHTML = "Previous"
        addButton.innerHTML = "Add to cart"

        // MODIF DES CLASSES
        divButtons.classList.add("divButtons")
        teddyName.classList.add("teddyName")
        teddyPrice.classList.add("teddyPrice")
        teddyDescription.classList.add("teddyDescription")
        teddyImage.classList.add("teddyImg")
        previousButton.classList.add("btn")
        previousButton.classList.add("btn-outline-dark")
        previousButton.classList.add("returnLink")
        addButton.classList.add("btn")
        addButton.classList.add("btn-outline-dark")
        addButton.classList.add("add-cart")

        // AJOUT ATTRIBUTS
        teddyLabel.setAttribute("for", "color")
        teddySelect.setAttribute("id", "liste")
        previousButton.setAttribute("href", "index.html")



        for (let i = 0; i < teddy.colors.length; i++) {

            var option = createElement("option")
            var teddyColors = teddy.colors[i];
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

            addTocart()
            console.log(cart.length);

            span.innerHTML = cart.length
            Swal.fire({
                title: 'Your product has been added',
                icon: 'success',
                html: '<a href ="cart.html">Acces your cart by clicking here</a>',
                showCloseButton: true,
                showConfirmButton: false
            })
        })

        // FUNCTION PREVIOUS

        previousButton.addEventListener("click", () => {
            window.location = ("index.html" + "#ourProducts")
        })
    }).catch(() => {
        alert("ERREUR 404 : PAGE NOT FOUND")
    })
