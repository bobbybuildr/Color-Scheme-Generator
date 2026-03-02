const modeChoices = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
const modeSelector = document.getElementById('mode-selector')
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const colorPalletContainer = document.querySelector('.color-pallet-container')
const colorValues = document.querySelector('.color-values')


getColorSchemeBtn.addEventListener('click', () => {
  const selectedColor = document.getElementById('color-selector').value.slice(1)
  const selectedMode = document.getElementById('mode-selector').value
  colorPalletContainer.innerHTML = ""
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
      const colorAndHexContainer = document.createElement('div')
      const colorEl = document.createElement('div')
      const hexEl = document.createElement('div')

      colorAndHexContainer.classList.add('color-and-hex')
      colorEl.classList.add('color-sample')
      hexEl.classList.add('color-value')

      colorEl.style.backgroundColor = color.hex.value
      hexEl.textContent = color.hex.value

      colorAndHexContainer.appendChild(colorEl)
      colorAndHexContainer.appendChild(hexEl)
      colorPalletContainer.appendChild(colorAndHexContainer)
    })
  })
}

setModeChoices()