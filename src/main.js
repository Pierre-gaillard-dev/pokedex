const DOM_pokemon_list = document.getElementById("pokemon_list")
const DOM_pokemon_display = document.getElementById("pokemon_display")

let pokemons
let pokemon_number

async function get_liste() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon")
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

async function get_pokemon(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const update_liste = function (list) {
    for (a of list) {
        get_pokemon(a.url)
            .then(pokemon => {
                let pokemon_element = document.createElement("a")
                pokemon_element.innerHTML = pokemon.name
                pokemon_element.classList.add("pokemon_button")
                pokemon_element.onclick = update_pokemon_viewer_closure(pokemon)
                //pokemon_element.addEventListener("click", update_pokemon_viewer_closure(pokemon))
                DOM_pokemon_list.appendChild(pokemon_element)
            }
        )
    }
}

function update_pokemon_viewer_closure(pokemon) {
    function closure() {
        return update_pokemon_viewer(pokemon)
    }
    return closure
}

async function update_pokemon_viewer (pokemon) {
    console.log(pokemon);

    let stats
    pokemon.stats.forEach(stat => {
        stats += `
        <tr>
            <td>${stat.stat.name}</td>
            <td>${stat.base_stat}</td>
        </tr>
        `
    })

    DOM_pokemon_display.innerHTML = `
    <div class="split">
        <div id="image_viewer"><img src="${pokemon.sprites.front_default}" alt /></img>
    </div>
    <div id="informations">
        <div id="basics">
            <span id="list_number">${pokemon.order}</span>
            <span id="name">${pokemon.name}</span>
        </div>
    </div>
    <table id="stats">
        ${stats}
    </table>
    `
    /*
    let splitter = document.createElement("div")
    splitter.classList.add("split")
    DOM_pokemon_display.appendChild(splitter)

    let image_container = document.createElement("div")
    image_container.id = "image_container"
    splitter.appendChild(image_container)

    let informations = document.createElement("div")
    splitter.appendChild(informations)
    
    let basics = document.createElement("div")
    informations.appendChild(basics)

    let list_number = document.createElement("span")
    list_number.innerHTML = pokemon.order
    basics.appendChild(list_number)

    let name = document.createElement("span")
    name.innerHTML = pokemon.name
    basics.appendChild(name)
    */
}


get_liste()
    .then(response => {
        //console.log(response)
        pokemons = response.results
        pokemon_number = response.count
        //console.log(pokemons);
        update_liste(pokemons)
    })


