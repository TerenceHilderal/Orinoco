

alert("BONJOUR")

fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243")
.then(response => response.json())
.then(function(data){
    let teddy1 = data
    console.log(teddy1);
    
})