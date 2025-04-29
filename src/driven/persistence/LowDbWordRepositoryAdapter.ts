import { Low } from "lowdb";
import { Word } from "../../application/domain/models/Word";
import { WordRepository } from "../../application/ports/WordRepository";
import { WordPersistence, WordPersistenceModel } from "./model/WordPersistence";

export class LowDbWordRepositoryAdapter implements WordRepository {

    constructor(private db: Low<{  words: WordPersistenceModel[] }>) {}

    public async pullAll(): Promise<Word[]> {
        const words = this.db.data.words.map(({ text, status }) => {
            const wordPersistence = new WordPersistence(text, status)
            return wordPersistence.toDomain()
        })
        return words
    }

    public async pushMany(newWords: Word[]): Promise<void> {
        const { words } = this.db.data
        const notUpdatedWords = words.filter(({ text }) => {
            return !newWords.find((newWord) => String(newWord.value.text) === text)
        })
        const updatedWords = newWords.map(newWord => {
            const newPersistenceWords = WordPersistence.fromDomain(newWord)
            return newPersistenceWords.toObject()
        })

        this.db.data.words = [...notUpdatedWords, ...updatedWords]
        this.db.write()
    }
}