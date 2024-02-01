const button = document.querySelector('button')
const data = document.querySelector('.data')
button.addEventListener('click', () => parseData())
function parseData() {
    data.append('Processing Data')
    console.log('Processing Data')
}
