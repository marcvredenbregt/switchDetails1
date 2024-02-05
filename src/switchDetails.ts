const message = document.querySelector('.message') as HTMLInputElement
const button = document.querySelector('button') as HTMLInputElement

button.addEventListener('click', () => fetchFile())
function fetchFile() {
    fetch('http://localhost:10000/switch-details',
    {
        method: "POST"
    })
    .then(response => response.text())
    .then((data: string) => {

        // Convert the switchDetails-array to a JSON-formatted string
        // var jsonString = JSON.stringify(switchData, null, 2)
        message.innerHTML = '<br>JSON data created'
        console.log(data)            

        // Download JSON on user request
        downloadJson(data)
    })
    .catch(error => console.error("Error processing data: ", error))
}

function downloadJson(jsonString: string) {

    const downloadJson = document.querySelector('.download') as HTMLInputElement

    // Create a Blob with the JSON string
    var blob = new Blob([jsonString], { type: "application/json" })

    // Create a link element and trigger a download
    var link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'switchDetails.json'
            
    // Append the link to the document
    downloadJson.appendChild(link)
    downloadJson.appendChild(document.createElement('br'))
    
    // Provide a button for the user to click and download
    var downloadButton = document.createElement('button')
    downloadButton.textContent = 'Download JSON'
    downloadButton.addEventListener('click', function() {
        link.click()
    });
    downloadJson.appendChild(downloadButton)
    downloadJson.removeChild(link)
}
