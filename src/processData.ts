import { SwitchDetail } from "./switchDetail"
import { SearchString } from "./searchString"
/**
 * Class ProcessData for parsing data from an input string.
 * @author Marc vredenbregt
 */
export class ProcessData {

    constructor() {
    }

    static matchItems1: { [key: string]: string[] } = {
                        'media_type': ['Type:', 'Vendor'],
                        'vendor_name': ['Name :', 'Part'],
                        'part_number': ['Part Number :', 'Serial Number'],
                        'serial_number': ['Serial Number :', 'Wavelength'],
                        'wavelength': ['Wavelength:', 'Temp']}
    static matchItems2: { [key: string]: string[] } = {
                        'temp': ['Temp.*?:', 'Status', 'Temp.*?Status :', 'Low Warn'],
                        'voltage_aux-1': ['Voltage.*?:', 'Status', 'Voltage.*?Status :', 'Low Warn'],
                        'tx_power': ['Tx Power.*?:', 'Status', 'Tx Power.*?Status :', 'Low Warn'],
                        'rx_power': ['Rx Power.*?:', 'Status', 'Rx Power.*?Status :', 'Low Warn'],
                        'tx_bias_current': ['Bias.*?:', 'Status', 'Bias.*?Status :', 'Low Warn']}

    /**
     * Parse the input data and return an array of objects in a specific format.
     * @param data The input data string to parse.
     * @returns An array of objects that conforms to the switchDetail interface.
     */
    parse(data: string): SwitchDetail[] {

        // Remove newline's and trim remarks at the end from string
        var nonew: string = data.replace((/  |\r\n|\n|\r/gm),'')
        const index: number = nonew.indexOf('===')
        if (index !== -1) nonew = nonew.slice(0, index).trim()

        // Split string on ports
        const ports: string[] = nonew.split('Port')

        // Loop through ports-array to fill all items in switchDetails[]
        var switchDetails: SwitchDetail[] = []
        let match, lastIndex: number, status: string, value: number, text: string, search: SearchString
        for (let i=0; i<ports.length; i++) {
            match = ports[i].match(/:(\d+)/)
            if (match && match[1]) {
                lastIndex = switchDetails.length
                value = parseInt(match[1], 10)
                switchDetails.push({"port":value})
                lastIndex = switchDetails.length - 1

                // Find error message
                match = ports[i].match(/Error:(.+)/)
                if (match && match[1]) {
                    text = match[1].trim()
                    switchDetails[lastIndex].error = text
                }

                // Loop through matchItems1
                for (let key in ProcessData.matchItems1) {
                    search = new SearchString(ports[i], ProcessData.matchItems1[key][0], ProcessData.matchItems1[key][1])
                    text = search.findText()
                    if (text) {
                        switch (key) {
                            // this is necessary because typescript will not take a string 'key' as an index for switchDetails-array:
                            case 'media_type': switchDetails[lastIndex].media_type = text; break
                            case 'vendor_name': switchDetails[lastIndex].vendor_name = text; break
                            case 'part_number': switchDetails[lastIndex].part_number = text; break
                            case 'serial_number': switchDetails[lastIndex].serial_number = text; break
                            case 'wavelength': switchDetails[lastIndex].wavelength = text; break
                            default: break
                            // switchDetails[lastIndex][key] = text (this works in javascript!)
                        }
                    }    
                }

                // Loop through matchItems2
                for (let key in ProcessData.matchItems2) {
                    search = new SearchString(ports[i], ProcessData.matchItems2[key][0], ProcessData.matchItems2[key][1])
                    text = search.findText()
                    if (text) {
                        value = parseFloat(text)
                        search = new SearchString(ports[i], ProcessData.matchItems2[key][2], ProcessData.matchItems2[key][3])
                        status = search.findText()
                        if (status) {
                            switch (key) {
                                case 'temp': switchDetails[lastIndex].temp = {"value":value, "status":status}; break
                                case 'voltage_aux-1': switchDetails[lastIndex]['voltage_aux-1'] = {"value":value, "status":status}; break
                                case 'tx_power': switchDetails[lastIndex].tx_power = {"value":value, "status":status}; break
                                case 'rx_power': switchDetails[lastIndex].rx_power = {"value":value, "status":status}; break
                                case 'tx_bias_current': switchDetails[lastIndex].tx_bias_current = {"value":value, "status":status}; break
                                default: break
                            }
                        }
                    }    
                }
            }
        }
        return switchDetails
    }
}