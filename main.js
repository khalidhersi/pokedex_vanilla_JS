const pokedex = document.querySelector(".pokedex__container");
const pokemonNum = 905;
const button = document.querySelectorAll("button")
const kantoButton = document.getElementById("kanto");
const johtoButton = document.getElementById("johto");
const hoennButton = document.getElementById("hoenn");
const sinnohButton = document.getElementById("sinnoh");
const UnovaButton = document.getElementById("unova");
const kalosButton = document.getElementById("kalas");
const alolaButton = document.getElementById("alola");
const galarButton = document.getElementById("galar");

let regionModifierStart = 1;
let regionModifierEnd = pokemonNum;


const btnOnClick = (event) => {
    if(event.target.innerHTML == "Kanto"){
        regionModifierStart = 1;
        regionModifierEnd = 151;
        console.log("kanto")
    } else if(event.target.innerHTML == "Johto"){
        regionModifierStart = 152;
        regionModifierEnd = 251;
        console.log(regionModifierEnd)
    } else if(event.target.innerHTML == "Hoenn"){
        regionModifierStart = 252;
        regionModifierEnd = 386;
    } else if(event.target.innerHTML == "Sinnoh"){
        regionModifierStart = 387;
        regionModifierEnd = 493;
    } else if(event.target.innerHTML == "Unova"){
        regionModifierStart = 494;
        regionModifierEnd = 649;
    } else if(event.target.innerHTML == "Kalos"){
        regionModifierStart = 650;
        regionModifierEnd = 721;
    } else if(event.target.innerHTML == "Alola"){
        regionModifierStart = 722;
        regionModifierEnd = 809;
    } else if(event.target.innerHTML == "Galar"){
        regionModifierStart = 810;
        regionModifierEnd = 905;
    } else {
        regionModifierStart = 1;
        regionModifierEnd = 905;
    }
    console.log(regionModifierEnd)
    return regionModifierStart, regionModifierEnd
    


// switch (button) {
//     case "Kanto":
//         regionModifierStart = 1;
//         regionModifierEnd = 151;
//         console.log("kanto")
//     break;
//     case "Johto":
//         regionModifierStart = 152;
//         regionModifierEnd = 251;
//     break;
//     case "Hoenn":
//         regionModifierStart = 252;
//         regionModifierEnd = 386;
//     break;
//     case "Sinnoh":
//         regionModifierStart = 387;
//         regionModifierEnd = 493;
//     break;
//     case "Unova":
//         regionModifierStart = 494;
//         regionModifierEnd = 649;
//     break;
//     case "Kalos":
//         regionModifierStart = 650;
//         regionModifierEnd = 721;
//     break;
//     case "Alola":
//         regionModifierStart = 722;
//         regionModifierEnd = 809;
//     break;
//     case "Galar":
//         regionModifierStart = 810;
//         regionModifierEnd = 905;
//     break;
//     default:
//         regionModifierStart = 1;
//         regionModifierEnd = 905;
// }
}

console.log(regionModifierEnd)


button.forEach(item => {
    item.addEventListener('click', event => {
      btnOnClick(event)
    })
  })

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

const fetchPokemon = async () => {
  for (i = regionModifierStart; i <= regionModifierEnd; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  createPokemonCard(pokemon);
};

fetchPokemon();

const createPokemonCard = (pokemon) => {
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokedex.appendChild(pokemonElement);

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonElement.style.backgroundColor = color;

  const uppercaseFirstLetter = pokemon.name[0].toUpperCase();
  
  pokemonElement.innerHTML = ` 
        <div class="img-container">
            <img class="pokemon__img" src=${pokemon.sprites.front_default} />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${
              uppercaseFirstLetter + pokemon.name.slice(1)
            }</h3> 
            <small class="type">Type: <span>${type}</span></small>
        </div>`;
};
