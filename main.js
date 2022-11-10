import './src/css/main.css'
import { clickPokemon, savePokemon } from './src/js/events.js'

const getPokemon = async() => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=60";
  const result = await fetch(url);
  const response = await result.json();
  const listOfPromises = response.results.map((pokemon) => getData(pokemon.url));
  return Promise.all(listOfPromises);
  
};
const getData = async(pokemon) => {
  const result = await fetch(pokemon);
  const response = await result.json();
  return response;
};

const pokemonListPromise = getPokemon();
pokemonListPromise.then(list => {
  list.forEach(pokemon => {
    document.querySelector('#list-pokemon').innerHTML += `
    <div class="pokemon__item">
      <input class="pokemon__item__checkbox" type="checkbox" value="${pokemon.id}">
      <h2 class="pokemon__item__name">${pokemon.name}</h2>
      <img class="pokemon__item__image" src="${pokemon.sprites.back_default}" alt="${pokemon.name}" />
    </div>
    `;
  });
  clickPokemon(document.querySelectorAll('#list-pokemon .pokemon__item'))
});

savePokemon(document.querySelector(".form__btn-save"));