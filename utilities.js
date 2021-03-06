/**
 * Creae an <option> element to use within the breed dropdown
 * @param {string} value The value of the option
 * @param {string} label The text to show as part of the option
 * @param {Object} attributes Any other attributes that should be on this option
 */
export function createOption(value, label, attributes = {}) {
  const option = document.createElement("option");

  if (attributes.disabled) {
    option.disabled = true;
  }

  if (attributes.selected) {
    option.selected = true;
  }

  if (attributes.subbreed) {
    option.dataset.subbreed = attributes.subbreed;
  }

  option.value = value;
  option.innerText = label;

  return option;
}