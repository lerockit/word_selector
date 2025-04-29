import { InsertWordsByValues } from "../../../application/usecases/InsertWordsByValues";
import { InsertWordRequestModel, InsertWordResponseModel, InsertWordsRequest } from "../model/InsertWordsRequest";
import { HttpAction } from "./HttpAction";

export class InsertWordsByValuesHttpAction implements HttpAction<
    InsertWordRequestModel, InsertWordResponseModel
> {
    constructor(private readonly useCase: InsertWordsByValues) {}

    public async execute({ wordsValues }: InsertWordRequestModel): Promise<void> {
        const insertWordsRequest = new InsertWordsRequest(wordsValues)
        await this.useCase.execute(insertWordsRequest.toDomain())
    }
}