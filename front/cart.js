


const createElement = element => document.createElement(element)

const append = (parent, el) => parent.appendChild(el)

// je récupère l'élément où vont être affichés mes teddies

const tablebody = document.querySelector("#cart-tablebody")
const subTotal = document.querySelector(".subtotal")
const checkout = document.querySelector(".checkout")
const order = document.querySelector("#order")
const table = document.querySelector(".table")
let span = document.getElementById("numberArticle")
let total = null
let products = []

// FONCTIONS
const hide = document.querySelector("#hideafterconfirmation")
const hidden = () => hide.style.display = "none"
const show = document.querySelector("#showform")
const showform = () => show.style.display = "block"


// je regarde s'il j'ai quelque chose dans mon local storage 

const yourCart = localStorage.getItem("cart")
let yourCartParse = JSON.parse(localStorage.getItem("cart")) // tableau d'objet

const emptyCart = createElement("p")
const fullCart = createElement("p")

if (yourCartParse === null) {
  emptyCart.innerHTML = " Sorry , your cart is empty"
  append(checkout, emptyCart)
} else {
  fullCart.innerHTML = " Check your command : "
  append(checkout, fullCart)
}

for (let i = 0; i < yourCartParse.length; i++) {

  const articleInCart = yourCartParse[i]; // objets

  // je crée mon tableau
  const row = tablebody.insertRow(-1)
  row.id = articleInCart.id

  const cellName = row.insertCell(0)
  cellName.innerHTML = articleInCart.name

  const cellDesc = row.insertCell(1)
  cellDesc.innerHTML = articleInCart.description

  const cellColor = row.insertCell(2)
  cellColor.innerHTML = articleInCart.color

  const cellPrice = row.insertCell(3)
  cellPrice.innerHTML = articleInCart.price / 100

  const image = createElement("img")
  image.classList.add("imgInCart")
  image.src = articleInCart.image
  append(cellName, image)

  const cellDelete = createElement("button")
  cellDelete.innerHTML = "X"
  cellDelete.id = articleInCart.id

  append(cellPrice, cellDelete)

  // TOTAL COST

  total += articleInCart.price / 100
  subTotal.innerHTML = total

  // je mets dans mon tableau products a envoyer a l api les id des produits présents dans mon panier et les stock dans le storage
  products = [...products, articleInCart.id]
  // je mets a jour l'indication du nombre d'article
  span.innerHTML = products.length

  // au clic sur mon bouton supprimer je veux que la ligne correspondante soit supprimée
  cellDelete.addEventListener("click", (e) => {
    // je selectionne et supprime l'élément du dom avec l'id correspondant
    const deletedProduct = document.getElementById(e.target.id)
    deletedProduct.remove()
    // je veux qu'au clic mon span.innerHTML décrémente de 1
    span.innerHTML--
    // je filtre mon local storage je veux tout sauf le produit que j'ai effacé en cliquant dessus
    const newCart = yourCartParse.filter(stayProduct => stayProduct !== articleInCart)
    // je mets a jour mon storage
    const newCartStored = localStorage.setItem("cart", JSON.stringify(newCart))
    // je rafraichis ma page 
    location.reload()
    // ici , je filtre mon tableau produit ,tous les produits qui auront un id different de mon target id seront expulsés du tableau
    const newProducts = products.filter(product => product !== e.target.id)
    // je déverse mon nouveau tableau dans mon tableau produit
    products = [...newProducts]


    // calcul du total
    total -= articleInCart.price / 100
    subTotal.innerHTML = total
  })

}

// clic j'envoie mon array products

order.addEventListener("click", () => {
  if (products.length === 0) {
    Swal.fire({
      title: ' Sorry, your cart is empty, you can\'t confirm your order',
      icon: 'error',
      html: 'Don\'t worry you can go back to our home page by clicking <a href = index.html>here </a>',
      showCloseButton: true,
      showConfirmButton: false
    })
  } else {
    hidden()
    showform()
  }
})




// ************************************PARTIE FORMULAIRE ************************************************************************************
const lastName = document.getElementById("last_name")
const firstName = document.getElementById("first_name")
const email = document.getElementById("email")
const city = document.getElementById("city")
const address = document.getElementById("address")
const orderForm = document.getElementById("orderForm")
const inputs = document.querySelectorAll("input")


// fonction pour verifier la validité du champs remplis avec l API CONSTRAINT VALIDATION

const checkValidity = (input) => {
  input.addEventListener('invalid', (e) => {
    e.preventDefault()
    if (!e.target.validity.valid) {
      e.target.parentElement.classList.add('error')
      console.log("pas ok");
    }

    input.addEventListener('input', (e) => {
      if (e.target.validity.valid) {
        e.target.parentElement.classList.remove('error')
        console.log("ok")
      }
    })
  }
  )
}
Array.from(inputs).forEach(checkValidity)

// adresse de l'api pour le post

const urlApi = "http://localhost:3000/api/teddies/order"

// on créee l'objet à envoyé à l'api : 

let contact

let orderToSend

orderForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if (checkValidity) {

    contact = {
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      city: city.value,
      address: address.value
    }
    orderToSend = { contact, products }
    console.log(orderToSend);

    // fetch
    let paramFetch = {
      method: "POST",
      body: JSON.stringify(orderToSend),
      headers: { 'Content-type': "application/json" }
    };

    fetch(urlApi, paramFetch)
      .then(response => response.json())
      .then(function (order) {

        let orderConfirmed = {
          name: contact.lastName + " " + contact.firstName,
          price: total,
          orderId: order.orderId
        }

        let orderStorage = localStorage.setItem("customerOrder", JSON.stringify(orderConfirmed))
        window.location = "confirm.html"

      })
  }
})


















