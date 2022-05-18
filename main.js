//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
let idSearch = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
let proxy ="https://cors-anywhere.herokuapp.com/corsdemo"
// const par = {
//     "?":{
//         s:"Margarita"

//     }
// }
document.querySelector("#searchButton").addEventListener('click',getDrink)

function getDrink(){
    let drink = document.querySelector("#searchInput").value
    // drink = drink.split(" ").join("")
    console.log(drink)
    fetch((url+drink))
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        let list = document.querySelector("#resList")
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        for (let drink in data["drinks"]){
            let id = data["drinks"][drink]["idDrink"]
            let li = document.createElement("li")
            list.appendChild(li)
            let anchor = document.createElement("a")
            anchor.addEventListener('click',getInstructions.bind(null,id), false)
            anchor.innerText = data["drinks"][drink]["strDrink"]
            anchor.id = "anchorhighlight"
            li.id = "titleResultItem"
            let image = document.createElement("img")
            image.src = data["drinks"][drink]["strDrinkThumb"]
            image.classList.add("image")
            image.classList.add("fit")
            anchor.appendChild(image)
            li.appendChild(anchor)
        }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}


function getInstructions(id){
    fetch((idSearch+id))
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        let list = document.querySelector("#resList")
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        document.querySelector("#drinkName").innerText = data["drinks"][0]["strDrink"]
        let li = document.createElement("li")
        list.appendChild(li)
        // anchor.innerText = data["drinks"][drink]["strDrink"]
        let h3 = document.createElement("h3")
        h3.innerText = data["drinks"][0]["strInstructions"]
        h3.id = "instructions"
        li.appendChild(h3)
        let image = document.createElement("img")
        image.src = data["drinks"][0]["strDrinkThumb"]
        image.setAttribute("height","200px")
        image.setAttribute("width","200px")
        li.appendChild(image)
        for ( let i = 1;i <=15; i++){
            if (data["drinks"][0][`strIngredient${i}`] != null){
                let span = document.createElement("span")
                span.id ="ingredient"
                span.innerHTML = (data["drinks"][0][`strIngredient${i}`]) + ": " +(data["drinks"][0][`strMeasure${i}`]) + "<br>"
                li.appendChild(span)
            }
        }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}