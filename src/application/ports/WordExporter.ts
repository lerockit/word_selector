import { WordValue } from "../domain/models/WordValue";

export interface WordExporter {
    exportManyInDateFormat(wordsValuesInDateFormat: WordValue[]): Promise<void>
}