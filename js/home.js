const $table_pokemons = document.querySelector(".table__pokemons");
const $btnPrevious = document.querySelector(".btnPrevious");
const $btnNext = document.querySelector(".btnNext");
const $table_btns_span = document.querySelector(".table__btns-span");
const $btnSearch = document.querySelector(".btnSearch");

let limit = 50;
let offset = 0;
let previous = 1;

const showingPokemons = (limit, offset) => {
    $btnPrevious.setAttribute("disabled", "");
    $btnNext.setAttribute("disabled", "");
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(async res => {
            $table_pokemons.textContent = ""
            for (let i = 0; i < res.results.length; i++) {
                const pokemon = res.results[i].url;

                await fetch(pokemon)
                    .then(res => res.json())
                    .then(res => {

                        let type2;

                        try {
                            if (res.types[1].type.name) {
                                type2 = `<span class="pokemon__typeProperties pokemon__${res.types[1].type.name}">${res.types[1].type.name}</span>`
                            }
                        }

                        catch(e) {
                            type2 = ``
                        }

                        const pokemonInfo = document.createElement("DIV");
                        pokemonInfo.classList.add("pokemon");

                        pokemonInfo.innerHTML = `
                        <span class="pokemon__id">${("00" + res.id).slice(-3)}</span>
                        <div class="pokemon__sprite">
                            <img src="${res.sprites.front_default}" alt="${res.name}">
                        </div>
                        <span class="pokemon__name">${res.name}</span>
                        <div class="pokemon__type">
                            <span class="pokemon__typeProperties pokemon__${res.types[0].type.name}">${res.types[0].type.name}</span>
                            ${type2}
                        </div>`

                        $table_pokemons.appendChild(pokemonInfo)
                    })
            }

            $btnPrevious.removeAttribute("disabled");
            $btnNext.removeAttribute("disabled")
        })
}

showingPokemons(limit, offset)

$btnPrevious.addEventListener("click", () => {
    if (offset > 0) {
        offset -= 50;
        previous -= 50;

        showingPokemons(limit, offset);
        $table_btns_span.textContent = `${previous} - ${offset - 50}`
    }
    
})

$btnNext.addEventListener("click", () => {

    offset += 50;
    previous += 50;
    showingPokemons(limit, offset)

    $table_btns_span.textContent = `${previous} - ${offset + 50}`
})

$btnSearch.addEventListener("click", async () => {
    const $inputSearch = document.querySelector(".inputSearch").value.toLowerCase();


    if ($inputSearch === "") {
        showingPokemons(limit, offset)
    }

    if (parseInt($inputSearch)) {
        try {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${$inputSearch}`)
            .then(res => res.json())
            .then(res => {
                $table_pokemons.textContent = ""
                let type2;

                try {
                    if (res.types[1].type.name) {
                        type2 = `<span class="pokemon__typeProperties pokemon__${res.types[1].type.name}">${res.types[1].type.name}</span>`
                    }
                }
                
                catch(e) {
                    type2 = ""
                }
                const generatingPokemon = document.createElement("DIV");
                generatingPokemon.classList.add("pokemon")

                generatingPokemon.innerHTML = `
                <span class="pokemon__id">${("00" + res.id).slice(-3)}</span>
                <div class="pokemon__sprite">
                    <img src="${res.sprites.front_default}" alt="${res.name}">
                </div>
                <span class="pokemon__name">${res.name}</span>
                <div class="pokemon__type">
                    <span class="pokemon__typeProperties pokemon__${res.types[0].type.name}">${res.types[0].type.name}</span>
                    ${type2}
                </div>
                `
                $table_pokemons.appendChild(generatingPokemon)
            })
        }

        catch(e) {
            $table_pokemons.innerHTML = `<h2>Pokemon not found</h2>`
        }
    }

    else {
        await fetch("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0")
        .then(res => res.json())
        .then(async res => {
            $table_pokemons.textContent = ""
            for (let i = 0; i < res.results.length; i++) {
                await fetch(res.results[i].url)
                    .then(res => res.json())
                    .then(res => {
                        if (res.name.indexOf($inputSearch) !== -1 && $inputSearch !== "") {
                            let type2;

                            try {
                                if (res.types[1].type.name) {
                                    type2 = `<span class="pokemon__typeProperties pokemon__${res.types[1].type.name}">${res.types[1].type.name}</span>`
                                }
                            }

                            catch(e) {
                                type2 = ""
                            }
                            const generatingPokemon = document.createElement("DIV");
                            generatingPokemon.classList.add("pokemon");

                            generatingPokemon.innerHTML = `
                            <span class="pokemon__id">${("00" + res.id).slice(-3)}</span>
                            <div class="pokemon__sprite">
                                <img src="${res.sprites.front_default}" alt="${res.name}">
                            </div>
                            <span class="pokemon__name">${res.name}</span>
                            <div class="pokemon__type">
                                <span class="pokemon__typeProperties pokemon__${res.types[0].type.name}">${res.types[0].type.name}</span>
                                ${type2}
                            </div>`

                            $table_pokemons.appendChild(generatingPokemon)
                        }
                    })
            }

            if ($table_pokemons.textContent === "") {
                $table_pokemons.innerHTML = `<h2>Pokemon not found</h2>`
            }
        })
    }

    
    
    
})
