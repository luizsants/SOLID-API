export class LateCheckInValidationError extends Error {
    constructor() {
        super('The Check-in can only be validate until 20 mintues of its creation.')
    }
}