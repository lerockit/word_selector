import { CustomError, CustomErrorType } from "../../../utils/CustomError"

export abstract class DomainException extends CustomError {
    constructor(message: string) {
        super(message, CustomErrorType.DOMAIN)
    }
}