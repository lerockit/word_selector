import { Word } from "../domain/models/Word";

export interface WordRepository {
    pullAll(): Promise<Word[]>
    pushMany(newWords: Word[]): Promise<void>
}