import { ProcessData } from './processData.js'

const message = document.querySelector('.message')
const button = document.querySelector('button')

button.addEventListener('click', () => fetchFile())
function fetchFile() {
    fetch('http://localhost/switchDetails/data/switch-transciever-details.txt')
    .then(response => response.text())
    .then((data) => {
        const process = new ProcessData()

        // Parse through the switch-transciever-details.txt file
        const switchData = process.parse(data)

        // Convert the switchDetails-array to a JSON-formatted string
        var jsonString = JSON.stringify(switchData, null, 2)
        message.innerHTML = '<br>JSON data created'
        console.log(jsonString)            

        // Download JSON on user request
        process.downloadJson(jsonString)
    })
    .catch(error => console.error("Error processing data: ", error))
}