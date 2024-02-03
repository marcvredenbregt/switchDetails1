export class ProcessData {

    constructor() {
    }
 
    parse(data) {

        // Remove newline's and trim remarks at the end from string
        var nonew = data.replace((/  |\r\n|\n|\r/gm),'')
        const index = nonew.indexOf('===')
        if (index !== -1) nonew = nonew.slice(0, index).trim()

        // Split string on ports
        const ports = nonew.split('Port')

        // Loop through ports-array to fill all items in switchDetails[]
        var switchDetails = []
        let match, lastIndex, status, value
        for (let i=0; i<ports.length; i++) {
            match = ports[i].match(/:(\d+)/);
            if (match && match[1]) {
                value = parseInt(match[1], 10)
                switchDetails.push({"port":value})
                lastIndex = switchDetails.length - 1
                match = ports[i].match(/Error:(.+)/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].error = value
                }
                // match = ports[i].match(/Media Type:([^:]+)Vendor Name/)
                match = ports[i].match(/Type:(.*?)Vendor/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].media_type = value
                }
                match = ports[i].match(/Name :(.*?)Part/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].vendor_name = value
                }
                match = ports[i].match(/Part Number :(.*?)Serial Number/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].part_number = value
                }
                match = ports[i].match(/Serial Number :(.*?)Wavelength/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].serial_number = value
                }
                match = ports[i].match(/Wavelength:(.*?)Temp/)
                if (match && match[1]) {
                    value = match[1].trim()
                    switchDetails[lastIndex].wavelength = value
                }
                match = ports[i].match(/Temp \(Celsius\):(.*?)Status/)
                if (match && match[1]) {
                    value = parseFloat(match[1])
                    // value = Number(match[1]).toFixed(2)
                    match = ports[i].match(/Temp.*?Status :(.*?)Low Warn/)
                    if (match && match[1]) {
                        status = match[1].trim()
                        switchDetails[lastIndex].temp = {"value":value, "status":status}
                    }
                }
                match = ports[i].match(/Voltage.*?:(.*?)Status/)
                if (match && match[1]) {
                    value = parseFloat(match[1])
                    match = ports[i].match(/Voltage.*?Status :(.*?)Low Warn/)
                    if (match && match[1]) {
                        status = match[1].trim()
                        switchDetails[lastIndex]['voltage_aux-1'] = {"value":value, "status":status}
                    }
                }
                match = ports[i].match(/Tx Power.*?:(.*?)Status/)
                if (match && match[1]) {
                    value = parseFloat(match[1])
                    match = ports[i].match(/Tx Power.*?Status :(.*?)Low Warn/)
                    if (match && match[1]) {
                        status = match[1].trim()
                        switchDetails[lastIndex].tx_power = {"value":value, "status":status}
                    }
                }
                match = ports[i].match(/Rx Power.*?:(.*?)Status/)
                if (match && match[1]) {
                    value = parseFloat(match[1])
                    match = ports[i].match(/Rx Power.*?Status :(.*?)Low Warn/)
                    if (match && match[1]) {
                        status = match[1].trim()
                        switchDetails[lastIndex].rx_power = {"value":value, "status":status}
                    }
                }
                match = ports[i].match(/Bias.*?:(.*?)Status/)
                if (match && match[1]) {
                    value = parseFloat(match[1])
                    match = ports[i].match(/Bias.*?Status :(.*?)Low Warn/)
                    if (match && match[1]) {
                        status = match[1].trim()
                        switchDetails[lastIndex].tx_bias_current = {"value":value, "status":status}
                    }
                }
            }
        }
        return switchDetails
    }

    downloadJson(jsonString) {

        const downloadJson = document.querySelector('.download')

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
        
        // Remove the link from the document when not needed
        downloadJson.removeChild(link)
        
        // fs.writeFileSync('data/switchDetails.json', jsonString)
    }
}