

const createElement = element => document.createElement(element)

const append = (parent, el) => parent.appendChild(el)

// je récupère l'élément où vont être affichés mes teddies
const tablebody = document.querySelector("#cart-tablebody")
const subTotal = document.querySelector(".subtotal")
const checkout = document.querySelector(".checkout")
const order = document.querySelector("#order")
const table = document.querySelector(".table")
let numberArticle = document.getElementById("numberArticle")
let total = null
let products = []

// FONCTIONS
const hide = document.querySelector("#hideafterconfirmation")
const hidden = () => hide.style.display = "none"
const form = document.querySelector("#showform")
const showform = () => form.style.display = "block"


// looking for datas in my localStorage

const yourCart = localStorage.getItem("cart")
let yourCartParse = JSON.parse(localStorage.getItem("cart")) // array of object

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

  const articleInCart = yourCartParse[i]; // object

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

  // i put in product's array product's id which are going ot be send to the api and stock them  
  products = [...products, articleInCart.id]
  // updating number of article in the cart
  numberArticle.innerHTML = products.length

  // au clic sur mon bouton supprimer je veux que la ligne correspondante soit supprimée
  const deleteProduct = () => {
    cellDelete.addEventListener("click", (e) => {
      // i select the product i want to delete
      const deletedProduct = document.getElementById(e.target.id)
      deletedProduct.remove()
      // updating the number of article in my nav bar
      numberArticle.innerHTML--
      // by filtring it's returning an array with all producted excepted the one which i clicked on
      const newCart = yourCartParse.filter(stayProduct => stayProduct !== articleInCart)
      // updating my storage
      const newCartStored = localStorage.setItem("cart", JSON.stringify((newCart)))
      location.reload()
      // every products which have a different id's product of i want are ejected of the array
      const newProducts = products.filter(product => product !== e.target.id)
      // using spread operator to add my new array to my products array
      products = [...newProducts]
      console.log(products);
      // total cost
      total -= articleInCart.price / 100
      subTotal.innerHTML = total
    })
  }
  deleteProduct()
}

// display a message error and show the form if needed

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

// const checkValidity = (input) => {
//   input.addEventListener('invalid', (e) => {
//     e.preventDefault()
//     if (!e.target.validity.valid) {
//       e.target.parentElement.classList.add('error')
//       console.log("pas ok");
//     }

//     input.addEventListener('input', (e) => {
//       if (e.target.validity.valid) {
//         e.target.parentElement.classList.remove('error')
//         console.log("ok")
//       }
//     })
//   }
//   )
// }
// Array.from(inputs).forEach(checkValidity)
// catch the small element
// const small = document.getElementsByTagName("small")
// console.log(small);
// new RegExp('^[a-zA-Z-¨é]+', 'g')

// creating a regexp and listening changing event on each inputs
let regexFullName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
let regexAddress = /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç ]+)+$/
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

// listening event on changement
orderForm.last_name.addEventListener('change', () => validLastName(this))
orderForm.first_name.addEventListener('change', () => validFirstName(this))
orderForm.email.addEventListener('change', () => validEmail(this))
orderForm.city.addEventListener('change', () => validCity(this))
orderForm.address.addEventListener('change', () => validAdress(this))

// creating variable to test values of inputs 
let testLastName
let testFirstName
let testEmail
let testCity
let testAdress


const validLastName = () => {
  testLastName = regexFullName.test(lastName.value)
  let small = lastName.nextElementSibling
  if (testLastName) {
    small.innerHTML = " valid input"
    small.classList.remove('text-danger')
    small.classList.add('text-success')
  } else {
    small.innerHTML = " you shouldnt have a number in your first name"
    small.classList.remove('text-success')
    small.classList.add('text-danger')
  }
}
const validFirstName = () => {
  testFirstName = regexFullName.test(firstName.value)
  let small = firstName.nextElementSibling
  if (testFirstName) {
    small.innerHTML = " Valid input"
    small.classList.remove('text-danger')
    small.classList.add('text-success')
  } else {
    small.innerHTML = " you shouldnt have a number in your first name"
    small.classList.remove('text-success')
    small.classList.add('text-danger')
  }
}
const validEmail = () => {
  testEmail = emailRegExp.test(email.value)
  let small = email.nextElementSibling
  if (testEmail) {
    small.innerHTML = " Valid input"
    small.classList.remove('text-danger')
    small.classList.add('text-success')
  } else {
    small.innerHTML = " you shouldnt have a number in your first name"
    small.classList.remove('text-success')
    small.classList.add('text-danger')
  }
}
const validCity = () => {
  testCity = regexFullName.test(city.value)
  let small = city.nextElementSibling
  if (testCity) {
    small.innerHTML = " Valid input"
    small.classList.remove('text-danger')
    small.classList.add('text-success')
  } else {
    small.innerHTML = " you shouldnt have a number in your first name"
    small.classList.remove('text-success')
    small.classList.add('text-danger')
  }
}
const validAdress = () => {
  testAdress = regexAddress.test(address.value)
  let small = address.nextElementSibling
  if (testAdress) {
    small.innerHTML = " Valid input"
    small.classList.remove('text-danger')
    small.classList.add('text-success')
    console.log(testAdress);
  } else {
    small.innerHTML = " you shouldnt have a number in your first name"
    small.classList.remove('text-success')
    small.classList.add('text-danger')
  }
}

// adresse de l'api pour le post

const urlApi = "http://localhost:3000/api/teddies/order"

// initializing object to send them to the api
let contact; let orderToSend

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (testFirstName == false || !testLastName || !testEmail || !testCity || !testAdress) {
    e.preventDefault()
  }
  else if (contact = "") {
    e.preventDefault()
  }
  else {

    contact = {
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      city: city.value,
      address: address.value
    }
    orderToSend = { contact, products }

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


















