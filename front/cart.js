

const createElement = element => { return document.createElement(element) }

const append = (parent, el) => { return parent.appendChild(el) }


// je récupère l'élément où vont être affichés mes teddies

const tablebody = document.querySelector("#cart-tablebody")
const subTotal = document.querySelector(".subtotal")
const checkout = document.querySelector(".checkout")
const order = document.querySelector("#order")
const table = document.querySelector(".table")
const tr = document.querySelector("tr")
const td = document.querySelector("td")


// je regarde s'il j'ai quelque chose dans mon local storage 
const yourCart = localStorage.getItem("cart")


const yourCartParse = JSON.parse(localStorage.getItem("cart"))

// 

if (yourCartParse === null) {
  const emptyCart = createElement("p")
  emptyCart.innerHTML = " Sorry , your cart is empty"
  append(checkout, emptyCart)
} else {
  const fullCart = createElement("p")
  fullCart.innerHTML = " Check your command : "
  append(checkout, fullCart)

  for (let i = 0; i < yourCartParse.length; i++) {

    const articleInCart = yourCartParse[i];

    const row = tablebody.insertRow(0)

    const cellName = row.insertCell(0)
    cellName.innerHTML = articleInCart.name

    const cellDesc = row.insertCell()
    cellDesc.innerHTML = articleInCart.description

    const cellColor = row.insertCell()
    cellColor.innerHTML = articleInCart.color

    const cellPrice = row.insertCell()
    cellPrice.innerHTML = articleInCart.price / 100

    const image = createElement("img")
    image.classList.add("imgInCart")
    image.src = articleInCart.image
    append(cellName, image)

    const cellDelete = createElement("button")
    cellDelete.innerHTML = "X"
    append(row, cellDelete)

    cellDelete.addEventListener("click", () => {

      table.deleteRow
      articleInCart.splice(i, 1)

    })
    order.addEventListener("click", () => {
      const orderToSend = localStorage.setItem()
    })
  }

}





