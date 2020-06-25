
const createElement = element => { return document.createElement(element) }

const append = (parent, el) => { return parent.appendChild(el) }


// je récupère l'élément où vont être affichés mes teddies

const tablebody = document.querySelector("#cart-tablebody")
const subTotal = document.querySelector(".subtotal")
const checkout = document.querySelector(".checkout")
const order = document.querySelector("#order")
const table = document.querySelector(".table")
let total = null
let products = []

// FONCTIONS


// je regarde s'il j'ai quelque chose dans mon local storage 

const yourCart = localStorage.getItem("cart")
const yourCartParse = JSON.parse(localStorage.getItem("cart")) // tableau d'objet

if (yourCartParse === null) {
  const emptyCart = createElement("p")
  emptyCart.innerHTML = " Sorry , your cart is empty"
  append(checkout, emptyCart)
} else {
  const fullCart = createElement("p")
  fullCart.innerHTML = " Check your command : "
  append(checkout, fullCart)
}

for (let i = 0; i < yourCartParse.length; i++) {

  const articleInCart = yourCartParse[i]; // objets

  const row = tablebody.insertRow(-1)
  row.setAttribute("id", "cell" + i)

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
  append(row, cellDelete)

  // calcul du total

  total += articleInCart.price / 100
  subTotal.innerHTML = total

  // je mets dans mon tableau products a envoyer a l api les id des produits présents dans mon panier et les stock dans le storage

  products = [...products, articleInCart.id]
  let orderStored = localStorage.setItem("products", JSON.stringify(products))
  console.log(products);



  // au clic sur mon bouton supprimer je veux que la ligne correspondante soit supprimée
  cellDelete.addEventListener("click", () => {

    // la ligne selectionée doit être supprimée
    $("#cell" + i).remove();

    // ensuite je veux que la ligne qui a été supprimée de mon panier , supprime l'objet correspondant mon array products
    products.splice([i], 1)
    console.log(products)

    // je set le nouveau storage 
    orderStored = localStorage.setItem("products", JSON.stringify(products))

    total -= articleInCart.price / 100
    subTotal.innerHTML = total
    console.log(total);

  })
  // au clic j'envoie mon array products
  order.addEventListener("click", () => {
    if (products.length === 0) {
      console.log("vous n'avez aucun produit a envoyé");
    } else {
      console.table(products);
      console.log(products);
    }
  })
}




// PARTIE FORMULAIRE ************************************************************************************
const lastName = document.getElementById("last_name")
const firstName = document.getElementById("first_name")
const email = document.getElementById("email")
const city = document.getElementById("city")
const adress = document.getElementById("adress")

const validLastName = () => {
  const lastNameReg = new RegExp('^[a-zA-Z-]+[a-zA-Z]+$', 'g')
  const testLastName = lastNameReg.test(lastName.value)
  console.log(testLastName);
}
const validFirstName = () => {
  const nameReg = new RegExp('^[a-zA-Z-]+[a-zA-Z]+$', 'g')
  const testName = nameReg.test(firstName.value)
  console.log(testName);
}
const validEmail = () => {
  const emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
  const emailTest = emailReg.test(email.value)
  console.log(emailTest);
}
const validCity = () => {
  const cityReg = new RegExp('^[a-zA-Z- ]+[a-zA-Z ]+$', 'g')
  const testCity = cityReg.test(city.value)
  console.log(testCity);
}

const validAddress = () => {
  const adressRef = new RegExp('^[a-zA-Z- ]+[a-zA-Z ]+$', 'g') // expression bidon pour tester
  const adressTest = adressRef.test(adress.value)
  console.log(adressTest);
}

// j'écoute ce qu'il se passe 
lastName.addEventListener("change", () => {
  validLastName();
});

firstName.addEventListener("change", () => {
  validFirstName()
})

email.addEventListener("change", () => {
  validEmail()
})

city.addEventListener("change", () => {
  validCity()
})

adress.addEventListener("change", () => {
  validEmail()
})

const contact = {
  lastName: lastName.value,
  firstName: firstName.value,
  email: email.value,
  city: city.value,
  adress: adress.value
}





