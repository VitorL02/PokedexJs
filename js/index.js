const pokemonNumber = document.getElementById('number');
const pokemonName = document.getElementById('name');
const pokemonImage = document.getElementById('image');
const pokemonSearch = document.getElementById('search');
const pokemonSearchInput = document.getElementById('search-query');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let searchPokemonById = 1;



const fetchPokemon = async (pokemon)=>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status===200){
        const data = await apiResponse.json();
        return data;
    }


};

const renderPokemonData  = async (pokemon)=>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    console.log(data);
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if(data.id >= 650 ){
            pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default']; 
        }
        pokemonImage.style.display = 'block';
        searchPokemonById = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :/';
        pokemonNumber.innerHTML = '';
    }
};

pokemonSearch.addEventListener('submit',(event)=>{
    event.preventDefault();

    renderPokemonData(pokemonSearchInput.value.toLowerCase());
    pokemonSearchInput.value ='';
});

prevButton.addEventListener('click',()=>{
    if(searchPokemonById === 0){
        searchPokemonById = 1;
        renderPokemonData(searchPokemonById);
    }else{
        searchPokemonById = searchPokemonById - 1;
        renderPokemonData(searchPokemonById);
    }
});
nextButton.addEventListener('click',()=>{
    searchPokemonById = searchPokemonById + 1;
    renderPokemonData(searchPokemonById);
});




renderPokemonData(searchPokemonById);
