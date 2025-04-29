import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { WordValue } from "../../application/domain/models/WordValue";
import { WordExporter } from "../../application/ports/WordExporter";
import { WordExport } from "./model/WordExport";

export class FileWordExportAdapter implements WordExporter {
    public async exportManyInDateFormat(wordValues: WordValue[]): Promise<void> {
        const today = new Date()
        const wordsExport = wordValues.map(wordValue => {
            const word = new WordExport(wordValue.text, today)
            today.setDate(today.getDate() + 1)
            return word
        })

        const wordsToJsString = `
        {
            ${wordsExport.reduce<string>(this.formatWordsInJsString, '')}
        }
        `
        
        this.writeFile(wordsToJsString, this.getFileName(wordsExport))
    }

    private formatWordsInJsString(previousValues: string, currentWordExport: WordExport): string {
        if(!previousValues) return `${currentWordExport.getFormattedValue()},`
        return `${previousValues}
            ${currentWordExport.getFormattedValue()},`
    }

    private getFileName(wordsExport: WordExport[]) {
        const [firstWord] = wordsExport
        const [lastWord] = wordsExport.slice(-1)
        const [startDate] = Object.keys(firstWord.toObject())
        const [endDate] = Object.keys(lastWord.toObject())

        return `${startDate}____${endDate}.js`
    }

    private async writeFile(fileContent: string, fileName: string): Promise<void> {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = join(__dirname, '..', '..', '..', `/db/files/${fileName}`)

        writeFile(filePath, fileContent)
    }
}