import { WordStatus, wordStatusValueOf } from "./WordStatus"
import { WordValue } from "./WordValue"

export class Word {
    constructor(
        public value: WordValue,
        public status: WordStatus
    ) {}

    public static build(value: WordValue, status?: WordStatus) {
        return new Word(value, wordStatusValueOf(status ?? WordStatus.AVALIABLE ))
    }
}