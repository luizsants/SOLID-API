export class maxNumberOfCheckInsError extends Error {
    constructor() {
        super('Max number of check-ins reached.')
    }
}