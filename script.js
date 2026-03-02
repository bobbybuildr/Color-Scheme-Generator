const modeChoices = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
const modeSelector = document.getElementById('mode-selector')
const getColorSchemeBtn = document.getElementById('get-color-scheme-btn')
const colorPalletContainer = document.querySelector('.color-pallet-container')
const colorValues = document.querySelector('.color-values')
const clickToCopy = document.getElementById('click-to-copy')
const clickToCopyText = 'Click color to copy'

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

const fetchAndDisplayColors = (hexVal, mode, count = 5) => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexVal}&mode=${mode}&count=${count}`)
    .then(res => res.json())
    .then(data => {
    clickToCopy.textContent = clickToCopyText
    let copyTextTimer
    data.colors.forEach((color) => {
      const colorHexValue = color.hex.value
      const colorAndHexContainer = document.createElement('div')
      const colorEl = document.createElement('div')
      const hexEl = document.createElement('div')

      colorAndHexContainer.classList.add('color-and-hex')
      colorEl.classList.add('color-sample')
      hexEl.classList.add('color-value')

      colorEl.style.backgroundColor = colorHexValue
      hexEl.textContent = colorHexValue

      colorAndHexContainer.addEventListener('click', () => {
        if (copyTextTimer) { clearTimeout(copyTextTimer) }
        navigator.clipboard.writeText(colorHexValue)
        clickToCopy.textContent = `Copied: ${colorHexValue}`
        copyTextTimer = setTimeout(() => {
          clickToCopy.textContent = clickToCopyText
        }, 2000)
      })

      colorAndHexContainer.appendChild(colorEl)
      colorAndHexContainer.appendChild(hexEl)
      colorPalletContainer.appendChild(colorAndHexContainer)
    })
  })
}

setModeChoices()
fetchAndDisplayColors(
  document.getElementById('color-selector').value.slice(1), 
  document.getElementById('mode-selector').value
)