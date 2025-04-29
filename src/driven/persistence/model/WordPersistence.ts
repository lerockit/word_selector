import { Word } from "../../../application/domain/models/Word";
import { wordStatusValueOf } from "../../../application/domain/models/WordStatus";
import { WordValue } from "../../../application/domain/models/WordValue";
import { PersistenceModel } from "./PersistenceModel";

export type WordPersistenceModel = {
    text: string,
    status: string
}

export class WordPersistence implements PersistenceModel<Word> {
    constructor(
        public readonly text: WordPersistenceModel['text'],
        public readonly status: WordPersistenceModel['status']
    ) {}

    public toDomain(): Word {
        return new Word(WordValue.build(this.text), wordStatusValueOf(this.status))
    }

    public toObject(): WordPersistenceModel {
        return {
            text: this.text,
            status: this.status
        }
    }

    public static fromDomain({ status, value }: Word): WordPersistence {
        return new WordPersistence(String(value.text), status)
    }
}