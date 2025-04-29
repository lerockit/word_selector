import { InsertWordsByValues } from "../application/usecases/InsertWordsByValues"
import { loadDb } from "../configs/lowdb"
import { LowDbWordRepositoryAdapter } from "../driven/persistence/LowDbWordRepositoryAdapter"
import { InsertWordsByValuesHttpAction } from "../driver/http/actions/InsertWordsByValuesHttpAction"

export const insertWordsByValuesHttpActionFactory = async (): Promise<InsertWordsByValuesHttpAction> => {
    const db = await loadDb()
    const wordRepository = new LowDbWordRepositoryAdapter(db)
    const useCase = new InsertWordsByValues(wordRepository)
    return new InsertWordsByValuesHttpAction(useCase)
}