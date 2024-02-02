export class ParseData {
    constructor() {
    }

    parse(data) {
        const message = document.querySelector('.message')
        message.append('Processing Data')
        console.log(data)
    }
}