

const createElement = element => { return document.createElement(element) }

const append = (parent, el) => { return parent.appendChild(el) }


// je récupère l'élément où vont être affichés mes teddies

const tablebody = document.querySelector("#cart-tablebody")
const subTotal = document.querySelector(".subtotal")
const checkout = document.querySelector(".checkout")
const order = document.querySelector("#order")


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

    const article = createElement("tr")
    article.innerHTML = articleInCart.name,
      append(tablebody, article)

    const image = createElement("img")
    image.classList.add("imgInCart")
    image.src = articleInCart.image
    append(article, image)

    const description = createElement("td")
    description.innerHTML = articleInCart.description
    append(article, description)

    const color = createElement("td")
    color.innerHTML = articleInCart.color
    append(article, color)

    // const qty = createElement("input")
    // qty.setAttribute("type", "number")
    // qty.setAttribute("value", "1")
    // qty.setAttribute("id", "qty")
    // qty.setAttribute("min", "1")
    // qty.setAttribute("max", "10")
    // append(article, qty)

    const price = createElement("td")
    price.innerHTML = articleInCart.price / 100
    price.classList.add("price" + [i])
    append(article, price)

    const supButon = createElement("button")
    supButon.innerHTML = "X"
    append(article, supButon)

    supButon.addEventListener("click", () => {
      alert("votre article a bien été supprimé")
    })


    order.addEventListener("click", () => {
      const orderToSend = localStorage.setItem()
    })
  }

}





