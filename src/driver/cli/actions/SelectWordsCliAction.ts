import { Word } from "../../../application/domain/models/Word";
import { ExportWordsValues } from "../../../application/usecases/ExportWordsValues";
import { UseWords } from "../../../application/usecases/UseWords";
import { CliClient } from "../../ports/CliClient";
import { CliAction } from "./CliAction";

export class SelectWordsCliAction implements CliAction {
    private selectedWords: Word[] = []
    private wordsQuantity: string

    constructor(
        private readonly client: CliClient,
        private readonly useWords: UseWords,
        private readonly exportWordsValues: ExportWordsValues
    ) {}

    public async execute(): Promise<void> {
        await this.setQuantity()
        await this.selectWords()
        this.exportWordsValues.execute(this.selectedWords.map(({ value }) => value))
    }

    private async setQuantity(): Promise<void> {
        const wordsQuantity = await this.client.ask("Quantas palavras deseja usar?")
        if(!wordsQuantity) {
            this.client.log("Por favor selecione uma quantidade valida de palavras")
            return this.setQuantity()
        }

        this.wordsQuantity = wordsQuantity
    }

    private async selectWords(): Promise<void> {
        const wordsRetrieved = await this.useWords.execute({ quantity: +this.wordsQuantity })

        if(!wordsRetrieved.length) return this.client.log("Não há mais palavras para serem usadas")

        const newWords = await this.client.askOptions<Word>(
            "Selecione as palavras validas:", 
            wordsRetrieved.map(wordRetrieved => ({ 
                label: wordRetrieved.value.text, 
                value: wordRetrieved
             }))
        )

        this.selectedWords = [...this.selectedWords, ...newWords]

        const continueSelectingWords = await this.client.confirm("Deseja selecionar mais palavras?")

        if(!newWords.length || continueSelectingWords) {
            return this.selectWords()
        }
    }
}