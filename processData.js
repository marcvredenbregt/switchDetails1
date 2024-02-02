import { ParseData } from './parseData.js'

const button = document.querySelector('button')
button.addEventListener('click', () => fetchFile())
function fetchFile() {
    fetch('http://localhost/switchDetails/data/switch-transciever-details.txt')
    .then(response => response.text())
    .then((data) => {
        const parser = new ParseData()
        parser.parse(data)
    })
}