import { WordValue } from "../../../application/domain/models/WordValue"
import { InsertWordsInvalidWordsParam } from "../exceptions/InsertWordsException"
import { HttpRequestModel } from "./HttpRequestModel"

export type InsertWordRequestModel = {
    wordsValues: string[]
}

export type InsertWordResponseModel = void

export class InsertWordsRequest implements HttpRequestModel<WordValue[]> {
    constructor(public readonly wordsValues: InsertWordRequestModel['wordsValues']) {
        if(
            !wordsValues||
            !Array.isArray(wordsValues) ||
            !wordsValues.length
        ) throw new InsertWordsInvalidWordsParam()
    }

    public toDomain(): WordValue[] {
        return this.wordsValues.map(wordValue => new WordValue(wordValue))
    }
}