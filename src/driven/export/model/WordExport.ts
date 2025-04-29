import { WordValue } from "../../../application/domain/models/WordValue";

export class WordExport {
    public readonly value: string

    constructor(private readonly text: string, private readonly rawDate: Date) {
        this.value = this.getFormattedWord()
    }

    private getFormattedWord(): string {
        // TODO: Retorna a data em UTC, portanto se for gerar a noite pode ser que comece a partir do dia seguinte
        const wordDate = this.rawDate.toISOString().split('T')[0]
        return JSON.stringify({ [wordDate]: this.text })
    }

    public toObject(): Record<string, string> {
        return JSON.parse(this.value)
    }

    public static fromDomain(wordValue: WordValue, rawDate: Date) {
        return new WordExport(wordValue.text, rawDate)
    }
}