/**
 * Class representing a utility for searching and extracting text between two specified strings.
 * @class
 * @property {string} input - The input string to search for data.
 * @property {string} firstString - The first string used for matching.
 * @property {string} secondString - The second string used for matching.
 * @author Marc vredenbregt
 */
export class SearchString {

    private input: string
    private firstString: string
    private secondString: string

    /**
     * Creates an instance of SearchString.
     * @param {string} input - The input string to search for data.
     * @param {string} firstString - The first string.
     * @param {string} secondString - The second string.
     */
    constructor(input: string, firstString: string, secondString: string) {
        this.input = input
        this.firstString = firstString
        this.secondString = secondString
    }

    /**
     * Find a string between two match criteria (first and second string)
     * @returns {string} The text between the first and second string.
     */
    findText(): string {
        let match = this.input.match(this.firstString+'(.*?)'+this.secondString)
        if (match && match[1]) {
            return match[1].trim()
        } else {
            return ''
        }
    }
}