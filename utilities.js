export function createOption(value, label, attributes = {}) {
  const option = document.createElement("option");

  if (attributes.disabled) {
    option.disabled = true;
  }

  if (attributes.selected) {
    option.selected = true;
  }

  if(attributes.subbreed) {
    option.dataset.subbreed = attributes.subbreed;
  }

  option.value = value;
  option.innerText = label;

  return option;
}