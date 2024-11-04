const pokedex = document.getElementById("pokedex");

console.log(pokedex)

//fetching pokemons using api and using and resolving promises.
const fetchPokemon = () => {

    const fetchRequests = [];
    for(let i=1; i<=150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        fetchRequests.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(fetchRequests).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type:  data.types
                                .map((insideElement)=>insideElement.type.name)
                                .join(', ') 

        }))
        displayPokemon(pokemon)
    })
}


const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTML = pokemon.map( p => `
        <li class="card">
            <img class="card=image" src="${p.image}"/>
            <h2 class="card-title">${p.id}. ${p.name}</h2>
            <p class="card-subtitle">${p.type}</p>

        </li>
        
        `).join("")
    pokedex.innerHTML = pokemonHTML;
}

fetchPokemon();