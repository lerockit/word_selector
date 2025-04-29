import { Word } from "../domain/models/Word";
import { WordValue } from "../domain/models/WordValue";
import { WordRepository } from "../ports/WordRepository";
import { UseCase } from "./UseCase";

export class InsertWordsByValues implements UseCase<WordValue[], void> {
    constructor(private readonly wordRepository: WordRepository) {}

    public async execute(wordsValues: WordValue[]): Promise<void> {
        this.wordRepository.pushMany(
            wordsValues.map(wordValue => Word.build(wordValue))
        )
    }   
}
