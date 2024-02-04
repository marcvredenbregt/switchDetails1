export class ProcessData {

    constructor() {
    }
 
    parse(data: string) {

        interface switchDetail {
            error?: string;
            port: number;
            media_type?: string;
            vendor_name?: string;
            part_number?: string;
            serial_number?: string;
            wavelength?: string;
            temp?: {
              value: number;
              status: string;
            };
            'voltage_aux-1'?: {
              value: number;
              status: string;
            };
            tx_power?: {
              value: number;
              status: string;
            };
            rx_power?: {
              value: number;
              status: string;
            };
            tx_bias_current?: {
              value: number;
              status: string;
            };
        }

        // Remove newline's and trim remarks at the end from string
        var nonew: string = data.replace((/  |\r\n|\n|\r/gm),'')
        const index: number = nonew.indexOf('===')
        if (index !== -1) nonew = nonew.slice(0, index).trim()

        // Split string on ports
        const ports: string[] = nonew.split('Port')

        // Loop through ports-array to fill all items in switchDetails[]
        var switchDetails: switchDetail[] = []
        let match, lastIndex: number, status: string, value: number, text: string
        for (let i=0; i<ports.length; i++) {
            match = ports[i].match(/:(\d+)/)
            if (match && match[1]) {
                lastIndex = switchDetails.length
                value = parseInt(match[1], 10)
                switchDetails.push({"port":value})
                lastIndex = switchDetails.length - 1
                match = ports[i].match(/Error:(.+)/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].error = text
                }
                // match = ports[i].match(/Media Type:([^:]+)Vendor Name/)
                match = ports[i].match(/Type:(.*?)Vendor/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].media_type = text
                }
                match = ports[i].match(/Name :(.*?)Part/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].vendor_name = text
                }
                match = ports[i].match(/Part Number :(.*?)Serial Number/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].part_number = text
                }
                match = ports[i].match(/Serial Number :(.*?)Wavelength/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].serial_number = text
                }
                match = ports[i].match(/Wavelength:(.*?)Temp/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].wavelength = text
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
}