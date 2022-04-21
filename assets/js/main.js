

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center',
			detach: false
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo h1').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);

//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
let idSearch = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
let proxy ="https://cors-anywhere.herokuapp.com/corsdemo"
// const par = {
//     "?":{
//         s:"Margarita"

//     }
// }
document.querySelector("#searchbutton").addEventListener('click',getDrink)

function getDrink(){
    let drink = document.querySelector("#searchinput").value
    // drink = drink.split(" ").join("")
    console.log(drink)
    fetch((url+drink))
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        let list = document.querySelector("#reslist")
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        for (let drink in data["drinks"]){
            let id = data["drinks"][drink]["idDrink"]
            let li = document.createElement("li")
            list.appendChild(li)
            let anchor = document.createElement("a")
            // anchor.innerText = data["drinks"][drink]["strDrink"]
            anchor.addEventListener('click',getInstructions.bind(null,id), false)
            anchor.innerText = data["drinks"][drink]["strDrink"]
            anchor.id = "anchorhighlight"
            li.id = "titleResultItem"
            // let h3 = document.createElement("h3")
            // h3.innerText = data["drinks"][drink]["strDrink"]
            // anchor.appendChild(h3)
            let image = document.createElement("img")
            image.src = data["drinks"][drink]["strDrinkThumb"]
            image.classList.add("image")
            image.classList.add("fit")
            // image.setAttribute("height","100px")
            // image.setAttribute("width","100px")
            anchor.appendChild(image)
            li.appendChild(anchor)
        }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}


function getInstructions(id){
    // drink = drink.split(" ").join("")
    fetch((idSearch+id))
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        let list = document.querySelector("#reslist")
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
        document.querySelector("#drinkname").innerText = data["drinks"][0]["strDrink"]
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

