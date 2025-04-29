import { WordsAvaliableEmptyException } from "../domain/exceptions/WordExceptions";
import { Word } from "../domain/models/Word";
import { WordStatus } from "../domain/models/WordStatus";
import { WordRepository } from "../ports/WordRepository";
import { UseCase } from "./UseCase";

type Params = { quantity?: number }

export class UseWords implements UseCase<Params, Word[]> {
    private DEFAULT_WORD_QUANTITY = 100

    constructor(private readonly wordRepository: WordRepository) {}
    
    async execute({ quantity }: Params): Promise<Word[]> {
        const allWords = await this.wordRepository.pullAll()
        const avaliableWords = allWords
            .filter(word => word.status === WordStatus.AVALIABLE)
        const wordsUsed = avaliableWords
            .sort(() => Math.random() - 0.5)
            .slice(0, quantity ?? this.DEFAULT_WORD_QUANTITY)

        if(!wordsUsed.length) throw new WordsAvaliableEmptyException()

        wordsUsed.forEach(word => word.status = WordStatus.UNAVALIABLE)

        await this.wordRepository.pushMany(wordsUsed)

        return wordsUsed
    }
}