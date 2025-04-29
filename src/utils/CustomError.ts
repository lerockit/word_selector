export enum CustomErrorType {
    DOMAIN,
    HTTP_REQUEST
}

export abstract class CustomError extends Error {
    constructor(message: string, public readonly type: CustomErrorType) {
        super(message)
    }
}