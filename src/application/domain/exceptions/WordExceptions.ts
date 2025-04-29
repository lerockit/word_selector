import { DomainException } from "./DomainException"

export class InvalidWordValueType extends DomainException {
    constructor() {
        super("WordValue type must be string")
        this.name = "InvalidWordValueType"
        Object.setPrototypeOf(this, InvalidWordValueType.prototype)
    }
}

export class InvalidWordValueLengthException extends DomainException {
    constructor(validLength: number) {
        super(`WordValue length must be ${validLength}`)
        this.name = "InvalidWordValueLengthException"
        Object.setPrototypeOf(this, InvalidWordValueLengthException.prototype)
    }
}

export class InvalidWordStatusException extends DomainException {
    constructor() {
        super("Invalid Word Status")
        this.name = "InvalidWordStatusException"
        Object.setPrototypeOf(this, InvalidWordStatusException.prototype)
    }
}

export class WordsAvaliableEmptyException extends DomainException {
    constructor() {
        super("Words Avaliable Empty")
        this.name = "WordsAvaliableEmptyException"
        Object.setPrototypeOf(this, WordsAvaliableEmptyException.prototype)
    }
}