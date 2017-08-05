import { getDogs, getDog } from './DogApi.js';
import { createOption } from './utilities.js';

const select = document.getElementById("breeds");
const image = document.getElementById("dog");
const info = document.getElementById("info");

getDogs().then(dogs => {
  select.innerHTML = "";
  select.appendChild(createOption("", "Select a breed...", {
    disabled: true,
    selected: true
  }));
  
  for (let [breed, variants] of Object.entries(dogs)) {
    if (variants.length > 0) {
      for(let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        select.appendChild(createOption(breed, `${breed} - ${variant}`, { subbreed: variant }));
      } 
    } else {
      select.appendChild(createOption(breed, breed));
    }
  }
}).catch(e => console.warn("whoops!", e));

select.addEventListener("change", e => {
  const breedName = e.target.value;
  const subbreed = e.target.options[e.target.selectedIndex].dataset.subbreed;
  let source;

  getDog(breedName, subbreed).then(dog => {
    if(dog.hasOwnProperty("image")) {
      image.src = dog.image;
      delete dog.image;
    }

    if(dog.hasOwnProperty("Source")) {
      source = dog.Source;
      delete dog.Source;
    }

    const dogData = document.createElement("dl");
    
    if(Object.entries(dog).length > 0) {
      Object.entries(dog).forEach(function(data) {
        const [name, fact] = data;

        dogData.innerHTML += `
          <dt>${name}</dt>
          <dd>${fact}</dd>`;
      });
    }

    if(source) {
      dogData.innerHTML += `
        <dt>Source</dt>
        <dd>
          <a href="${source.url}">${source.name}</a>
        </dd>
      `;
    }

    info.innerHTML = "";

    if(dogData.innerHTML !== "") {
      info.appendChild(dogData);
    }
  });
});