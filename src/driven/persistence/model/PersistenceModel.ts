export interface PersistenceModel<DomainModel> {
    toDomain(): DomainModel
}