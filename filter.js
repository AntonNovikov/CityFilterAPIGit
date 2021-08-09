const allCities = [];
const citiesStatesCopy = [];
const cityTable = document.querySelector("#city-table");
const searchInput = document.querySelector("#city-search");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

fetch("https://api.hh.ru/areas")
  .then((response) => response.json())
  .then((responseData) => {
    citiesStatesCopy.push(...responseData);

    for (resp of citiesStatesCopy[0].areas) {
      for (city of resp.areas) {
        allCities.push({ city: city.name, state: resp.name });
      }
    }
  });

const ul = document.createElement("ul");
ul.classList.add("suggestions");

cityTable.appendChild(ul);
const suggestionsContainer = document.querySelector(".suggestions");

function findMatches(wordToMatch, citiesStates) {
  return citiesStates.filter((cityState) => {
    const regX = new RegExp(wordToMatch, "gi");

    return cityState.city.match(regX) || cityState.state.match(regX);
  });
}

function displayMatches() {
  const findArray = findMatches(this.value, allCities);
  const matchEl = findArray
    .map((place) => {
      const regX = new RegExp(this.value, "gi");

      const cityName = place.city.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );

      const stateName = place.state.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );

      return `<li class="name">${cityName}, ${stateName}</li>`;
    })
    .join("");

  suggestionsContainer.innerHTML = matchEl;
}
