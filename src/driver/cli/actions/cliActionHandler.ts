import { CustomError, CustomErrorType } from "../../../utils/CustomError"
import { CliAction } from "./CliAction"

const getUnkownError = (e: any) => {
    return new Error(e.message, { cause: { trace: e.stack } })
}

const getGenericError = () => new Error('Server error try again later')

export const cliActionHandler = async (action: CliAction): Promise<void> => {
    try {
        await action.execute()
    } catch(e) {
        if(!(e instanceof CustomError)) throw getUnkownError(e)
        
        switch(e.type) {
            case CustomErrorType.DOMAIN:
                console.error({ 
                    erorr: e.name,
                    message: e.message,
                    trace: e.stack
                })

                throw getGenericError()
            default: 
                throw getUnkownError(e)
        }
    }
}