const modeChoices = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
const modeSelector = document.getElementById('mode-selector')
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const colorPallet = document.querySelector('.color-pallet')
const colorValues = document.querySelector('.color-values')


getColorSchemeBtn.addEventListener('click', () => {
  const selectedColor = document.getElementById('color-selector').value.slice(1)
  const selectedMode = document.getElementById('mode-selector').value
  colorPallet.innerHTML = ""
  fetchAndDisplayColors(selectedColor, selectedMode)
})



const setModeChoices = () => {
  let html = ""
  for (let choice of modeChoices) {
    html += `
    <option value=${choice}>${choice}</option>
    `
  }
  modeSelector.innerHTML = html
}

const fetchAndDisplayColors = (hexVal, mode) => {
fetch(`https://www.thecolorapi.com/scheme?hex=${hexVal}&mode=${mode}&count=5`)
  .then(res => res.json())
  .then(data => {
    data.colors.forEach((color) => {
      const newEl = document.createElement('div')
      newEl.classList.add('color-sample')
      newEl.style.backgroundColor = color.hex.value
      colorPallet.appendChild(newEl)
    })

    const colorValuesHtml = data.colors.map((color) => {
      return `
      <div class="color-value">${color.hex.value}</div>
      `
    }).join('')
    colorValues.innerHTML = colorValuesHtml
  })
}

setModeChoices()