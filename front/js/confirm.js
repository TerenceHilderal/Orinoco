
const createElement = element => document.createElement(element)

const append = (parent, el) => parent.appendChild(el)

const greetingUser = document.getElementById("greetingUser")

const getCustomerOrder = JSON.parse(localStorage.getItem("customerOrder"))

const congrats = createElement("h2")
congrats.innerHTML = " Congratulations for your order" + " " + getCustomerOrder.name + " :"

const totalOrder = createElement("p")
totalOrder.innerHTML = "Your total order is : " + getCustomerOrder.price + "$"

const idOrder = createElement("p")
idOrder.innerHTML = " Here is your id order : " + getCustomerOrder.orderId


const goBack = createElement("button")
goBack.innerHTML = "Home "
goBack.classList.add("confirmGoBack")
goBack.classList.add("btn")
goBack.classList.add("btn-outline-dark")
goBack.style.margin = "auto"

goBack.addEventListener("click", () => {
  localStorage.clear()
  window.location = '../index.html' + "#ourProducts"
})


append(greetingUser, congrats)
append(greetingUser, idOrder)
append(greetingUser, totalOrder)
append(greetingUser, goBack)


