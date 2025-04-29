import { HttpException } from "./HttpException"
export class InsertWordsInvalidWordsParam extends HttpException {
    constructor() {
        const message = 'words param is mandatory and must be an array with length >= 1'
        const statusCode = 400
        super(message, statusCode)
        this.name = "InsertWordsInvalidWordsParam"
        Object.setPrototypeOf(this, InsertWordsInvalidWordsParam.prototype)
    }
}