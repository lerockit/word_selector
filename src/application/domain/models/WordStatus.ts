import { enumValueOf } from "../../../utils/enum"
import { InvalidWordStatusException } from "../exceptions/WordExceptions"

export enum WordStatus {
    AVALIABLE = 'AVALIABLE',
    UNAVALIABLE = 'UNAVALIABLE',
}

export const wordStatusValueOf = (key: string): WordStatus => {
    return enumValueOf({
        Enum: WordStatus,
        Exception: InvalidWordStatusException,
        key
    })
}

