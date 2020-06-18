


function createElement(element){
    return document.createElement(element);
}

function append(parent,el) {
    return parent.appendChild(el);
}




 





















// const urlParams = new URLSearchParams(window.location.search)
// let idTeddies = urlParams.get("id")

// console.log(idTeddies);

// let tableBody = document.querySelector("#cart-tablebody")

// fetch("http://localhost:3000/api/teddies/"+idTeddies)
// .then(response => response.json())
// .then(function(data){

//     let inCartTeddy = data

//     let celName = createElement("th")
//     celName.innerHTML = inCartTeddy.name
//     console.log(celName);
        

//     celImage = createElement("img")
//     celImage.src = inCartTeddy.imageUrl
//     celImage.classList.add("inCartImage")

//     celColor = createElement("th")
//     celColor.innerHTML = inCartTeddy.colors[0]

//     celDescription = createElement("th")
//     celDescription.innerHTML = inCartTeddy.description

//     celPrice = createElement("th")
//     celPrice.innerHTML = inCartTeddy.price/100 + " $"

//     celDelete = createElement("button")
//     celDelete.innerHTML = "supprimer"
    

//     append(tableBody,celName)
//     append(celName,celImage)
//     append(tableBody,celDescription)
//     append(tableBody,celColor)
//     append(tableBody,celPrice)
//     append(tableBody,celDelete)

      
// })




