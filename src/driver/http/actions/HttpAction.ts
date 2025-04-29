export interface HttpAction<RequestModel, ResponseModel> {
    execute(params: RequestModel): Promise<ResponseModel>
}