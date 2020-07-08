// let removeCartStorage = localStorage.removeItem("cart")
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


const goBack = createElement("p")
goBack.innerHTML = "You're going to be redirect automaticaly to our home page"
goBack.style.margin = "auto"
goBack.setAttribute("href", "index.html")
setTimeout(function () { window.location = 'index.html'; }, 5000);

append(greetingUser, congrats)
append(greetingUser, idOrder)
append(greetingUser, totalOrder)
append(greetingUser, goBack)


