
const createElement = element => document.createElement(element);
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el)
    })
}
const append = (parent, el) => parent.appendChild(el);


const container = document.querySelector("#teddiesContainer")
const numberArticle = document.getElementById("numberArticle")
let cart = []

// when we came back to a page product : 
const checkStorage = localStorage.getItem("cart")
const checkStorageParse = JSON.parse(localStorage.getItem("cart"))

// if there is something in my storage i put it in my cart
if (checkStorage) {
    cart = [...checkStorageParse]
    numberArticle.innerHTML = cart.length
}
const fetchIndex = () => {
    fetch("http://localhost:3000/api/teddies/")
        .then(response => response.json())
        .then(function (data) {


            for (let getTeddies of data) {

                // Création des div
                let divCol = createElement("div")
                classElement(divCol, ["col-lg-6"])

                let divCard = createElement("div")
                classElement(divCard, ["card"])
                divCard.setAttribute("width", "30rem")

                let divCardBody = createElement("div")
                classElement(divCardBody, ["card-body"])

                let divButtons = createElement("div")
                classElement(divButtons, ["buttonPosition"])

                // création des éléments qui vont être append dans les div
                let img = createElement("img")
                img.classList.add('card-image-top')
                img.setAttribute("alt", "teddies")
                img.src = getTeddies.imageUrl

                let teddyName = createElement("h2")
                teddyName.innerHTML = getTeddies.name
                classElement(teddyName, ["card-title"])

                let teddyPrice = createElement("span")
                teddyPrice.innerHTML = "Price : " + " " + getTeddies.price / 100 + " $"

                let teddyDescription = createElement("p")
                teddyDescription.innerHTML = "Description : " + " " + getTeddies.description

                let buttonInfo = createElement("button")
                buttonInfo.innerHTML = "See more"
                classElement(buttonInfo, ["btn", "btn-outline-dark", "selection"])

                let addButton = createElement("button")
                addButton.innerHTML = "Add "
                classElement(addButton, ["btn", "btn-outline-dark", "addToCart"])

                const seeMore = () => {
                    buttonInfo.addEventListener("click", () => {
                        let id = getTeddies._id
                        document.location.href = "./front/product.html?id=" + id

                    })
                }
                seeMore()

                addButton.addEventListener("click", () => {

                    const addTocart = () => {
                        const teddyAdd = {
                            id: getTeddies._id,
                            name: getTeddies.name,
                            image: getTeddies.imageUrl,
                            description: getTeddies.description,
                            color: getTeddies.colors[0],
                            price: getTeddies.price,
                        }
                        cart = [...cart, teddyAdd];

                        localStorage.setItem("cart", JSON.stringify(cart))

                        numberArticle.innerHTML = cart.length

                        Swal.fire({
                            title: 'Your product has been added',
                            icon: 'success',
                            html: '<a href ="./front/cart.html">Acces your cart by clicking here</a><br>',
                            showCloseButton: true,
                            showConfirmButton: false
                        })
                    }
                    addTocart()
                })

                // append des div
                append(divCardBody, teddyName)
                append(divCardBody, teddyPrice)
                append(divCardBody, teddyDescription)
                append(divCol, divCard)
                append(divCard, img)
                append(divCard, divCardBody)
                append(divCard, buttonInfo)
                append(divCard, addButton)
                append(divCardBody, divButtons)
                append(divButtons, buttonInfo)
                append(divButtons, addButton)
                append(container, divCol)
            }
        })
}
fetchIndex()

// recover my storage

let numberProductsInCart = JSON.parse(localStorage.getItem("cart"))
if (!numberProductsInCart) {
    numberArticle.innerHTML = 0
} else {
    numberArticle.innerHTML = numberProductsInCart.length
}





















