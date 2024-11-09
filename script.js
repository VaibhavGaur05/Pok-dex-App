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
    console.log(pokemon);
    const pokemonHTML = pokemon.map( p => `
        <li class="card" onclick="selectPokemon(${p.id})">
            <img class="card=image" src="${p.image}"/>
            <h2 class="card-title">${p.id}. ${p.name}</h2>
            

        </li>
        
        `).join("")
    pokedex.innerHTML = pokemonHTML;
}

const selectPokemon = async (id) => {
    console.log(id);
} 


fetchPokemon();