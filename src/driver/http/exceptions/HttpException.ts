import { CustomError, CustomErrorType } from "../../../utils/CustomError";

export abstract class HttpException extends CustomError {
    constructor(message: string, public readonly statusCode: number) {
        super(message, CustomErrorType.HTTP_REQUEST)
    }
}