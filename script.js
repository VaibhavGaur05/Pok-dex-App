const pokedex = document.getElementById("pokedex");

console.log(pokedex)

//fetching pokemons using api and using and resolving promises.
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({

        ...result,
        id: index +1,
        image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,

    }))
    displayPokemon(pokemon);
}


const displayPokemon = (pokemon) => {
    
    const pokemonHTML = pokemon.map( p => `
        <li class="card" onclick="selectPokemon(${p.id})">
            <img class="card=image" src="${p.image}"/>
            <h2 class="card-title">${p.id}. ${p.name}</h2>
            

        </li>
        
        `).join("")
    pokedex.innerHTML = pokemonHTML;
}

const selectPokemon = async (id) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const res = await fetch(url);
   const pokemonData = await res.json();
    // this is a callback funcn  which will be passed as an argument in displayPopup() later on..
   displayPopup(pokemonData);
} 

const displayPopup = (pokemonData) => {
    const image = pokemonData.sprites['front_default']
    const type = pokemonData.types.map( element => element.type.name).join(',');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">
                close
            </button>
             <div class="card">
            <img class="card=image" src="${image}"/>
            <h2 class="card-title">${pokemonData.id}. ${pokemonData.name}</h2>
            <p><small>Height: </small>${pokemonData.height} | <small>Weight: </small>${pokemonData.weight} |
             <small>Type: </small>${type}

            </div>    



        </div> 
    `;
    pokedex.innerHTML = htmlString +pokedex.innerHTML;

};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup)

}



fetchPokemon();