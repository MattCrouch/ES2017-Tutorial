export async function getDogs() {
  let allDogs = await fetch("https://dog.ceo/api/breeds/list/all");
  let data = await allDogs.json();
  let dogs = data.message;

  return dogs;
}

async function getDogImage(breedName, subbreed = null) {
  try {
    let url = `https://dog.ceo/api/breed/${breedName}/images/random`;
    
    if(subbreed) {
      url = `https://dog.ceo/api/breed/${breedName}/${subbreed}/images/random`;
    }

    let dogImages = await fetch(url);
    let data = await dogImages.json();
    let dog = await data.message;

    return dog;
  } catch(e) {
    return null;
  }
}

async function getDogData(breedName, subbreed = null) {
  try {
    let url = `/info/${breedName}.json`;
    
    if(subbreed) {
      url = `/info/${breedName}-${subbreed}.json`;
    }
    
    let dogImages = await fetch(url);
    let dog = await dogImages.json();

    return dog;
  } catch(e) {
    return null;
  }
}

export async function getDog(breedName, subbreed = null) {
    const image = await getDogImage(breedName, subbreed);
    const data = await getDogData(breedName, subbreed);

    // return {
    //   image,
    //   ...data
    // };

    return Object.assign({ image }, data);
}