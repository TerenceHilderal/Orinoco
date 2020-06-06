
function createElement(element){
    return document.createElement(element);
}
function append (parent,el){
    return parent.appendChild(el);
}

let container = document.querySelector("#teddiesContainer")
console.log(container);



fetch("http://localhost:3000/api/teddies/")
.then(response => response.json())
.then (function(data){
    let teddies = data
    
    for (let getTeddies of data) {
       
        // Création des div
       let divCol = createElement("div")
       divCol.classList.add("col-6")
       

       let divCard = createElement ("div")
        divCard.classList.add("card")
        divCard.setAttribute("width","20rem")

        let divCardBody = createElement("div")
        divCardBody.classList.add("card-body")
       
        // création des éléments qui vont être append dans les div
       let img = createElement("img")
        img.classList.add('card-image-top')
        img.style.margin = "auto"
        img.style.width = "50%"
        img.setAttribute("alt","teddies")
        img.src = getTeddies.imageUrl
        append(divCard,img)
        
        // let teddyId = createElement("p")
        // teddyId.innerHTML = getTeddies._id
        // teddyId.classList.add("card-text")
        // append(divCardBody,teddyId)
        
        let teddyName = createElement("h5")
        teddyName.innerHTML = getTeddies.name
        teddyName.classList.add("card-title")
        append(divCardBody,teddyName)
        

        let teddyPrice = createElement ("span")
        teddyPrice.innerHTML = "Price : " + " " + getTeddies.price +"$" 
        append(divCardBody,teddyPrice)
        

        let teddyDescription = createElement("p")
        teddyDescription.innerHTML = "Description : " + " " + getTeddies.description
        append(divCardBody,teddyDescription) 

        var buttonInfo = createElement("button")
        buttonInfo.innerHTML = "See more"
        buttonInfo.classList.add("btn")
        buttonInfo.classList.add("btn-outline-primary")
        buttonInfo.classList.add("selection")
        
        buttonInfo.addEventListener("click", function(){
            let id = getTeddies._id
            console.log(id);

            if (id === "5be9c8541c9d440000665243") {
                window.location = "products.html"
            } else {
                window.location = "https://www.youtube.com"
            }
            
        })
        // append des div
        append(divCol,divCard)
        append(divCard,divCardBody)
        append(divCard,buttonInfo)
        append(container,divCol)
        
    }    

    
}) 






    

    



