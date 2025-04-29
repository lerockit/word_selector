import { WordValue } from "../domain/models/WordValue";
import { WordExporter } from "../ports/WordExporter";
import { UseCase } from "./UseCase";

export class ExportWordsValues implements UseCase<WordValue[], void> {
    constructor(private readonly wordExporter: WordExporter){}

    public async execute(wordValues: WordValue[]): Promise<void> {
        this.wordExporter.exportManyInDateFormat(wordValues)
    }
}