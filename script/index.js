const navbar = document.querySelector(".navbar");
const container = document.querySelector(".container");
const logo = document.querySelector(".logo");
const form = document.querySelector(".search-form");
const selectBar = document.getElementById("type-selector");
const searchBar = document.getElementById("search-bar");
const refreshButton = document.querySelector(".refresh-button");
const bgPaysage = [
  {
    name: "Eau",
    bgColor:
      "background: rgb(40,118,190); background: radial-gradient(circle, rgba(40,118,190,0.9) 29%, rgba(0,216,255,1) 100%);",
    color: "#20BBFF",
  },
  {
    name: "Vol",
    bgColor:
      "background: rgb(171,246,255); background: radial-gradient(circle, rgba(171,246,255,0.9) 29%, rgba(171,246,255,1) 100%);",
    color: "#ABF6FF",
  },
  {
    name: "Feu",
    bgColor:
      "background: rgb(144,32,32); background: radial-gradient(circle, rgba(144,32,32,0.9) 29%, rgba(124,0,0,1) 100%);",
    color: "#F01F1F",
  },
  {
    name: "Psy",
    bgColor:
      "background: rgb(92,26,148); background: radial-gradient(circle, rgba(92,26,148,0.9) 29%, rgba(118,0,217,1) 100%);",
    color: "#7600D9",
  },
  {
    name: "Plante",
    bgColor:
      "background: rgb(14,190,0); background: radial-gradient(circle, rgba(14,190,0,0.9) 29%, rgba(36,105,31,1) 100%);",
    color: "#0EBE00",
  },
  {
    name: "Électrik",
    bgColor:
      "background: rgb(118,119,50); background: radial-gradient(circle, rgba(118,119,50,1) 0%, rgba(206,209,0,1) 100%);",
    color: "#E2E520",
  },
  {
    name: "Ténèbres",
    bgColor:
      "background: rgb(6,4,11); background: radial-gradient(circle, rgba(6,4,11,1) 0%, rgba(47,44,53,1) 100%);",
    color: "#2F2C35",
  },
  {
    name: "Acier",
    bgColor:
      "background: rgb(193,189,200); background: radial-gradient(circle, rgba(193,189,200,1) 0%, rgba(124,124,124,1) 100%);",
    color: "#C1BDC8",
  },
  {
    name: "Normal",
    bgColor:
      "background: rgb(255,255,255); background: radial-gradient(circle, rgba(255,255,255,1) 26%, rgba(132,131,133,1) 100%);",
    color: "#848385",
  },
  {
    name: "Roche",
    bgColor:
      "background: rgb(108,78,51); background: radial-gradient(circle, rgba(108,78,51,1) 26%, rgba(201,121,48,1) 100%);",
    color: "#6C4E33",
  },
  {
    name: "Sol",
    bgColor:
      "background: rgb(251,154,60); background: radial-gradient(circle, rgba(251,154,60,1) 26%, rgba(255,226,198,1) 100%);",
    color: "#F6CCA4",
  },
  {
    name: "Combat",
    bgColor:
      "background: rgb(240,105,42); background: radial-gradient(circle, rgba(240,105,42,1) 26%, rgba(148,84,54,1) 100%);",
    color: "#F0692A",
  },
  {
    name: "Fée",
    bgColor:
      "background: rgb(255,147,244); background: radial-gradient(circle, rgba(255,147,244,1) 26%, rgba(212,0,189,1) 100%);",
    color: "#FF00E4",
  },
  {
    name: "Poison",
    bgColor:
      "background: rgb(0,202,89); background: radial-gradient(circle, rgba(0,202,89,1) 26%, rgba(171,99,232,1) 100%);",
    color: "#00CA59",
  },
  {
    name: "Insecte",
    bgColor:
      "background: rgb(151,232,60); background: radial-gradient(circle, rgba(151,232,60,1) 26%, rgba(88,131,39,1) 100%);",
    color: "#97E83C",
  },
  {
    name: "Spectre",
    bgColor:
      "background: rgb(161,74,185); background: radial-gradient(circle, rgba(161,74,185,1) 26%, rgba(49,30,54,1) 100%);",
    color: "#A14AB9",
  },
  {
    name: "Dragon",
    bgColor:
      "background: rgb(50,56,121); background: radial-gradient(circle, rgba(50,56,121,1) 26%, rgba(74,57,79,1) 100%);",
    color: "#323879",
  },
  {
    name: "Glace",
    bgColor:
      "background: rgb(41,255,252); background: radial-gradient(circle, rgba(41,255,252,1) 26%, rgba(42,161,159,1) 100%);",
    color: "#2ED0CE",
  },
];
let pokemons = [];
let searchPokemonArray = [];
let start = true;
let nb = 50;
let scrolling = 0;

async function fetchPokemons() {
  await fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then((res) => res.json())
    .then((data) => (pokemons = data))
    .then(() => {
      pokemons.forEach((pokemon) => searchPokemonArray.push(pokemon));
    });
}

async function searchPokemon(typeSearch, search) {
  searchPokemonArray = [];
  if (typeSearch === "name") {
    pokemons.map((pokemon) => {
      if (pokemon.name.toLowerCase().includes(search)) {
        searchPokemonArray.push(pokemon);
      }
    });
  } else if (typeSearch === "generation") {
    pokemons.map((pokemon) => {
      if (pokemon.apiGeneration == search) {
        searchPokemonArray.push(pokemon);
      }
    });
  } else if (typeSearch === "type") {
    pokemons.map((pokemon) => {
      for (let i = 0; i < pokemon.apiTypes.length; i++) {
        if (pokemon.apiTypes[i].name.toLowerCase().includes(search)) {
          searchPokemonArray.push(pokemon);
          break;
        }
      }
    });
  } else if (typeSearch === "resistance") {
    pokemons.map((pokemon) => {
      for (let i = 0; i < pokemon.apiResistances.length; i++) {
        if (pokemon.apiResistances[i].name.toLowerCase().includes(search)) {
          if (pokemon.apiResistances[i].damage_relation.includes("resistant")) {
            searchPokemonArray.push(pokemon);
            break;
          }
        }
      }
    });
  } else if (typeSearch === "weakness") {
    pokemons.map((pokemon) => {
      for (let i = 0; i < pokemon.apiResistances.length; i++) {
        if (pokemon.apiResistances[i].name.toLowerCase().includes(search)) {
          if (
            pokemon.apiResistances[i].damage_relation.includes("vulnerable")
          ) {
            searchPokemonArray.push(pokemon);
            break;
          }
        }
      }
    });
  }
}

// splice
function CreateLittleList() {
  if (refreshButton.classList.contains("hide-button")) {
    refreshButton.classList.remove("hide-button");
  }
  newList = [];
  searchPokemonArray.forEach((pokemon) => newList.push(pokemon));
  // faire le cas pour lequel il n'y a pas de pokemon
  if (start) {
    if (newList.length <= nb) {
      refreshButton.classList.add("hide-button");
      if (newList.length === 0) {
        container.innerHTML = `
          <div class="no-pokemon-find-text">
            <h2 class="pokemon-find">
                Aucun pokemon trouvé
            </h2>
          </div>
        `;
      } else if (newList.length === 1) {
        bigPokemonDisplay(newList[0]);
      } else {
        pokemonsDisplay(newList);
      }
    } else {
      element = newList.splice(0, nb);
      pokemonsDisplay(element);
    }
    start = false;
  } else {
    lastNb = nb;
    nb += 50;
    if (newList.length >= nb) {
      element = newList.splice(lastNb, 50);
      pokemonsDisplay(element);
    } else {
      refreshButton.classList.add("hide-button");
      element = newList.splice(lastNb);
      pokemonsDisplay(element);
    }
  }
}

const bigPokemonDisplay = (pokemon) => {
  const selectType = () => {
    if (pokemon.apiTypes.length === 1) {
      return "paysage/" + pokemon.apiTypes[0].name + ".jpg";
    } else {
      return (
        "paysage/" +
        pokemon.apiTypes[Math.floor(Math.random() * 2)].name +
        ".jpg"
      );
    }
  };

  const afficheType = () => {
    let types = [];
    for (let i = 0; i < pokemon.apiTypes.length; i++) {
      types.push(`
      <div class="energie">
          <img src="${pokemon.apiTypes[i].image}" alt="${pokemon.apiTypes[i].name}">
      </div>
      `);
    }
    return types;
  };

  const pokemonEvolutionBases = () => {
    if (pokemon.apiPreEvolution === "none") {
      return '<p class="evolution">Pokemon de base</p>';
    } else {
      return '<p class="evolution">Pokemon évolué</p>';
    }
  };

  const getPreEvolutionPokemon = () => {
    if (pokemon.apiPreEvolution !== "none") {
      return `
              <div class="last-evolution">
                  <img src="${
                    pokemons[pokemon.apiPreEvolution.pokedexIdd - 1].image
                  }" alt="${
        pokemons[pokemon.apiPreEvolution.pokedexIdd - 1].name
      }" id="evolution-img">
              </div>
        `;
    } else {
      return `
            <div class="last-evolution transparent none">
            </div>
          `;
    }
  };

  const getEvolutionPokemon = () => {
    if (pokemon.apiEvolutions.length === 1) {
      return `
              <div class="next-evolution">
                  <img src="${
                    pokemons[pokemon.apiEvolutions[0].pokedexId - 1].image
                  }" alt="${
        pokemons[pokemon.apiEvolutions[0].pokedexId - 1].name
      }" id="evolution-img">
              </div>
        `;
    } else {
      return `
            <div class="next-evolution transparent">
            </div>
          `;
    }
  };

  const getBackgroundTypes = (deg) => {
    if (pokemon.apiTypes.length === 1) {
      for (let i = 0; i < bgPaysage.length; i++) {
        if (bgPaysage[i].name === pokemon.apiTypes[0].name) {
          return `background: ${bgPaysage[i].color}`;
        }
      }
    } else {
      let bg = [];
      for (let i = 0; i < pokemon.apiTypes.length; i++) {
        for (let j = 0; j < bgPaysage.length; j++) {
          if (bgPaysage[j].name === pokemon.apiTypes[i].name) {
            bg.push(bgPaysage[j].color);
          }
        }
      }
      return `background: linear-gradient(${deg}deg, ${bg.join(",")})`;
    }
  };

  const getBackgroundLandscapeTypes = () => {
    if (pokemon.apiTypes.length === 1) {
      for (let i = 0; i < bgPaysage.length; i++) {
        if (bgPaysage[i].name === pokemon.apiTypes[0].name) {
          return bgPaysage[i].bgColor;
        }
      }
    } else {
      let bg = [];
      for (let i = 0; i < pokemon.apiTypes.length; i++) {
        for (let j = 0; j < bgPaysage.length; j++) {
          if (bgPaysage[j].name === pokemon.apiTypes[i].name) {
            bg.push(bgPaysage[j].bgColor);
          }
        }
      }
      return bg[Math.floor(Math.random() * 2)];
    }
  };

  const returnResistance = () => {
    let resistances = [];

    for (let i = 0; i < pokemon.apiResistances.length; i++) {
      resistances.push(`
        <div class="resistance">
          <img src="types/${pokemon.apiResistances[i].name}.png" alt="${
        pokemon.apiResistances[i].name
      }" id="type">
          <div class="progress-bar pb${
            pokemon.apiResistances[i].damage_multiplier * 100
          }"></div>
        </div>
      `);
    }

    return resistances;
  };

  container.innerHTML = `
      <div class="big-card" style="background-image: url(${selectType()}); background-size: cover">
      
      <div class="big-name-container" style="${getBackgroundTypes(
        90
      )}; opacity: .8;">
          <div class="big-type-container">
              ${afficheType().join("")}
          </div>

          <div class="name">
              <h2>${pokemon.name}</h2>
          </div>

          <div class="life">
              <h2><span class="HP">${pokemon.stats.HP}</span>HP</h2>
          </div>
      </div>

      <div class="pokemon" style="${getBackgroundLandscapeTypes()}">
          <div class="basis-evolution">
              ${pokemonEvolutionBases()}
          </div>
          
          <div class="big-picture">
              <img src="${pokemon.image}" alt="${pokemon.name}">
          </div>
          
      </div>
      <div class="evolution">
        ${getPreEvolutionPokemon()}
        ${getEvolutionPokemon()}
      </div>

      <div class="big-text-container" style="${getBackgroundTypes(
        30
      )}; opacity: .8">
          <div class="stats">
              <p>attaque: ${pokemon.stats.attack}</p>
              <p>defense: ${pokemon.stats.defense}</p>
              <p>speciale attaque: ${pokemon.stats.special_attack}</p>
              <p>spéciale defense: ${pokemon.stats.special_defense}</p>
              <p>speed: ${pokemon.stats.speed}</p>
          </div>

          <h2 class="title">Weakness</h2>
          <div class="resistance-weakness-container">
            ${returnResistance().join("")}
          </div>

      </div>
    </div>
  `;
  const lastEvolution = document.querySelector(".last-evolution");
  lastEvolution.addEventListener("click", () => {
    resetAll();
    bigPokemonDisplay(pokemons[pokemon.apiPreEvolution.pokedexIdd - 1]);
  });

  const evolution = document.querySelector(".next-evolution");
  evolution.addEventListener("click", () => {
    resetAll();
    bigPokemonDisplay(pokemons[pokemon.apiEvolutions[0].pokedexId - 1]);
  });
};

const pokemonsDisplay = (list) => {
  container.innerHTML += list
    .map((pokemon) => {
      let types = [];

      for (let i = 0; i < pokemon.apiTypes.length; i++) {
        types.push(
          `
                <div class="type">
                    <img src="${pokemon.apiTypes[i].image}" alt="${pokemon.apiTypes[i].name} type" id="type-img">
                    <p class="type-name">${pokemon.apiTypes[i].name}</p>
                </div>
                `
        );
      }

      return `
        <div class="card">
            <div class="picture-container">
                <img src="${pokemon.image}" alt="${
        pokemon.name
      }" id="pokemon-img">
            </div>
            <div class="text-container">
                <div class="name-container">
                    <p><span class="name">${
                      pokemon.name
                    }</span> #<span class="id">${pokemon.id}</span></p>
                </div>
                <div class="type-container">
                    ${types.join("")}
                </div>
            </div>
            <div class="magnifying-glass">
                <span class="material-symbols-outlined">search</span>
            </div>
            <div class="first-page-view">${pokemon.id}</div>
        </div>
        `;
    })
    .join("");
  addEvent();
};

const addEvent = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      id = e.target.textContent;
      refreshButton.classList.add("hide-button");
      resetAll();
      bigPokemonDisplay(pokemons[id - 1]);
    });
  });
};

const resetAll = () => {
  reset();
  searchBar.value = "";
  searchPokemonArray = [];
 }

const reset = () => {
  container.innerHTML = "";
  start = true;
  nb = 50;
  window.scrollTo(0, 0);
};

window.addEventListener(
  "onload",
  fetchPokemons().then(() => CreateLittleList(searchPokemonArray)) //bigPokemonDisplay(pokemons[0]) // pokemonsDisplay(searchPokemonArray)
);

window.addEventListener("scroll", () => {
  if (window.scrollY < scrolling) {
    navbar.style.top = "0px";
    scrolling = window.scrollY;
  } else {
    navbar.style.top = "-90px";
    scrolling = window.scrollY;
  }
});

logo.addEventListener("click", () => {
  reset();
  searchPokemonArray = [];
  pokemons.forEach((pokemon) => searchPokemonArray.push(pokemon));
  CreateLittleList();
});

selectBar.addEventListener("change", () => {
  resetAll();
  pokemons.forEach((pokemon) => searchPokemonArray.push(pokemon));
  CreateLittleList();
});

searchBar.addEventListener("input", (e) => {
  reset();
  searchPokemon(selectBar.value, e.target.value.toLowerCase()).then(() =>
    CreateLittleList()
  );
});

refreshButton.addEventListener("click", () => CreateLittleList());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  pokemonsDisplay();
});
