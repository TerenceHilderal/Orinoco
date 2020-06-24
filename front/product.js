
const createElement = element => { return document.createElement(element) }

const append = (parent, el) => { return parent.appendChild(el) }

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
        name: teddy.name,
        id: teddy._id,
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

// si il y a quelque chose dedans j'ajoute dans cart le contenu de localStorage
if (checkStorage) {
    cart = [...checkStorageParse]
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
        labelQt = createElement("label")
        qtSelect = createElement("select")
        addButton = createElement("button")

        // INNER
        teddyName.innerHTML = teddy.name
        teddyPrice.innerHTML = "Price : " + " " + teddy.price / 100 + " $"
        teddyDescription.innerHTML = "Description :" + " " + teddy.description
        teddyImage.src = teddy.imageUrl
        teddyLabel.innerHTML = "Colors : "
        previousButton.innerHTML = "Previous"
        labelQt.innerHTML = "Quantity  : "
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
        qtSelect.classList.add("qtSelect")
        addButton.classList.add("btn")
        addButton.classList.add("btn-outline-dark")
        addButton.classList.add("add-cart")

        // AJOUT ATTRIBUTS
        teddyLabel.setAttribute("for", "color")
        teddySelect.setAttribute("id", "liste")
        previousButton.setAttribute("href", "index.html")
        labelQt.setAttribute("for", "qt")
        qtSelect.setAttribute("id", "qt")


        for (let i = 0; i < teddy.colors.length; i++) {

            var option = createElement("option")
            var teddyColors = teddy.colors[i];
            option.setAttribute("value", teddyColors)
            option.innerHTML = teddyColors
            append(teddySelect, option)
        }

        for (let i = 1; i < 6; i++) {
            let qtChoice = createElement("option");
            qtChoice.innerHTML = i
            qtChoice.value = i
            qtChoice.setAttribute("value", "quantity" + i)
            append(qtSelect, qtChoice)
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
        append(divCol8, labelQt)
        append(divCol8, qtSelect)
        append(divCol8, divButtons)
        append(divButtons, previousButton)
        append(divButtons, addButton)

        // FUNCTION FOR ADDING CONTENT TO CART

        addButton.addEventListener("click", () => {

            addTocart()

        })

        // FUNCTION PREVIOUS

        previousButton.addEventListener("click", () => {
            window.location = ("index.html" + "#ourProducts")
        })
    }).catch(() => {
        alert("ERREUR 404 : PAGE NOT FOUND")
    })

