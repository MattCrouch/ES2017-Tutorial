// Import other modules
import { getDogs, getDog } from './DogApi.js';
import { createOption } from './utilities.js';

// Cache references to the DOM
const select = document.getElementById("breeds");
const image = document.getElementById("dog");
const info = document.getElementById("info");

// Initialise the breed dropdown selector
getDogs().then(dogs => {
  // Clear the dropdown and initialise it
  select.innerHTML = "";
  select.appendChild(createOption("", "Select a breed...", {
    disabled: true,
    selected: true
  }));
  
  // Iterate through the breeds to add to the dropdown
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

// Fetch data on the breed when it is selected
select.addEventListener("change", e => {
  // Find the breed and sub-breed if available
  const breedName = e.target.value;
  const subbreed = e.target.options[e.target.selectedIndex].dataset.subbreed;
  let source;

  // Fetch data
  getDog(breedName, subbreed).then(dog => {
    // Set the image if available
    if(dog.hasOwnProperty("image")) {
      image.src = dog.image;
      delete dog.image;
    }

    // Remove source data for special formatting later
    if(dog.hasOwnProperty("Source")) {
      source = dog.Source;
      delete dog.Source;
    }

    // Create a definition list to store the breed info
    const dogData = document.createElement("dl");
    
    // Iterate over breed info
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

    // Add info to the page
    info.innerHTML = "";
    if(dogData.innerHTML !== "") {
      info.appendChild(dogData);
    }
  });
});