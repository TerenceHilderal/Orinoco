
function createElement(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

let container = document.querySelector("#teddiesContainer")
let numberArticle = document.getElementById("numberArticle")
let cart = []

// when we came back to a page product : 
const checkStorage = localStorage.getItem("cart")
const checkStorageParse = JSON.parse(localStorage.getItem("cart"))

// if there is something in my storage i put it in my cart
if (checkStorage) {
    cart = [...checkStorageParse]
    numberArticle.innerHTML = cart.length
}

fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(function (data) {

        for (let getTeddies of data) {

            // Création des div
            let divCol = createElement("div")
            divCol.classList.add("col-lg-6")

            let divCard = createElement("div")
            divCard.classList.add("card")
            divCard.setAttribute("width", "30rem")

            let divCardBody = createElement("div")
            divCardBody.classList.add("card-body")

            let divButtons = createElement("div")
            divButtons.classList.add("buttonPosition")

            // création des éléments qui vont être append dans les div
            let img = createElement("img")
            img.classList.add('card-image-top')
            img.setAttribute("alt", "teddies")
            img.src = getTeddies.imageUrl
            append(divCard, img)

            let teddyName = createElement("h5")
            teddyName.innerHTML = getTeddies.name
            teddyName.classList.add("card-title")
            append(divCardBody, teddyName)


            let teddyPrice = createElement("span")
            teddyPrice.innerHTML = "Price : " + " " + getTeddies.price / 100 + " $"
            append(divCardBody, teddyPrice)


            let teddyDescription = createElement("p")
            teddyDescription.innerHTML = "Description : " + " " + getTeddies.description
            append(divCardBody, teddyDescription)

            let buttonInfo = createElement("button")
            buttonInfo.innerHTML = "See more"
            buttonInfo.classList.add("btn")
            buttonInfo.classList.add("btn-outline-dark")
            buttonInfo.classList.add("selection")

            let addButton = createElement("button")
            addButton.innerHTML = "Add "
            addButton.classList.add("btn")
            addButton.classList.add("btn-outline-dark")
            addButton.classList.add("addToCart")

            buttonInfo.addEventListener("click", function (recupId) {
                let id = getTeddies._id
                document.location.href = "product.html?id=" + id
            })

            addButton.addEventListener("click", () => {
                console.log("bonjour");
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
                    console.log(teddyAdd);

                    Swal.fire({
                        title: 'Your product has been added',
                        icon: 'success',
                        html: '<a href ="cart.html">Acces your cart by clicking here</a><br>',
                        showCloseButton: true,
                        showConfirmButton: false
                    })
                }
                addTocart()
            })
            // append des div
            append(divCol, divCard)
            append(divCard, divCardBody)
            append(divCard, buttonInfo)
            append(divCard, addButton)
            append(divCardBody, divButtons)
            append(divButtons, buttonInfo)
            append(divButtons, addButton)
            append(container, divCol)
        }

    })

// je récupere dans mon storage pour afficher le nombre de produits dans le panier 

let numberProductsInCart = JSON.parse(localStorage.getItem("cart"))
if (!numberProductsInCart) {
    numberArticle.innerHTML = 0
} else {
    numberArticle.innerHTML = numberProductsInCart.length
}





















