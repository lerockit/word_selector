import { WordValue } from "../../../application/domain/models/WordValue";

export class WordExport {
    public readonly value: string

    constructor(private readonly text: string, private readonly rawDate: Date) {
        const wordDate = this.rawDate.toISOString().split('T')[0]
        this.value = JSON.stringify({ [wordDate]: this.text })
    }

    public getFormattedValue(): string {
        return this.value
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('\"', '\'')
    }

    public toObject(): Record<string, string> {
        return JSON.parse(this.value)
    }

    public static fromDomain(wordValue: WordValue, rawDate: Date) {
        return new WordExport(wordValue.text, rawDate)
    }
}