import { ExportWordsValues } from "../application/usecases/ExportWordsValues";
import { UseWords } from "../application/usecases/UseWords";
import { loadDb } from "../configs/lowdb";
import { CliClientAdapter } from "../driven/client/CliClientAdapter";
import { FileWordExportAdapter } from "../driven/export/FileWordExportAdapter";
import { LowDbWordRepositoryAdapter } from "../driven/persistence/LowDbWordRepositoryAdapter";
import { SelectWordsCliAction } from "../driver/cli/actions/SelectWordsCliAction";

export const selectWordsCliActionFatory = async (): Promise<SelectWordsCliAction> => {
    const cliClient = new CliClientAdapter()

    const db = await loadDb()
    const wordRepository = new LowDbWordRepositoryAdapter(db)

    const wordExport = new FileWordExportAdapter()

    const useWord = new UseWords(wordRepository)
    const exportWordsValues = new ExportWordsValues(wordExport)

    return new SelectWordsCliAction(cliClient, useWord, exportWordsValues)
}