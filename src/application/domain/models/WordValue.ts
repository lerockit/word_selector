import { InvalidWordValueLengthException, InvalidWordValueType } from "../exceptions/WordExceptions"


export class WordValue {
    public static WORD_VALUE_TEXT_LENGTH = 5

    constructor(public readonly text: string) {
        this.validate(text)
    }

    public static build(text: string): WordValue {
        return new WordValue(text)
    }

    private validate(text: string): void {
        if(typeof text !== 'string') throw new InvalidWordValueType()
        if(text.length !== WordValue.WORD_VALUE_TEXT_LENGTH) {
            throw new InvalidWordValueLengthException(WordValue.WORD_VALUE_TEXT_LENGTH)
        }
    }
}