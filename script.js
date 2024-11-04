const pokedex = document.getElementById("pokedex");

console.log(pokedex)


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
        <li>
            <img src="${p.image}"/>
            <h2>${p.id} ${p.name}</h2>
            <p>${p.type}</p>

        </li>
        
        `).join("")
    pokedex.innerHTML = pokemonHTML;
}

fetchPokemon();