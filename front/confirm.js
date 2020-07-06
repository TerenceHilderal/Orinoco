// let removeCartStorage = localStorage.removeItem("cart")
const createElement = element => document.createElement(element)

const append = (parent, el) => parent.appendChild(el)

const greetingUser = document.getElementById("greetingUser")

const getCustomerOrder = JSON.parse(localStorage.getItem("customerOrder"))
console.log(getCustomerOrder);

const congrats = createElement("h2")
congrats.innerHTML = " Congratulations for your command " + " " + getCustomerOrder.name + " :"

const totalOrder = createElement("p")
totalOrder.innerHTML = "Your total order is : " + getCustomerOrder.price + "$"

const idOrder = createElement("p")
idOrder.innerHTML = " Your id command is : " + getCustomerOrder.orderId

const goBack = createElement("a")
goBack.innerHTML = "Back to Home page"
goBack.style.margin = "auto"
goBack.setAttribute("href", "index.html")

append(greetingUser, congrats)
append(greetingUser, idOrder)
append(greetingUser, totalOrder)
append(greetingUser, goBack)

// Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })
swal.fire("Here's a message!")
