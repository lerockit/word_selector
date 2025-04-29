export interface HttpRequestModel<DomainModel> {
    toDomain(): DomainModel
}