import { CustomError, CustomErrorType } from "../../../utils/CustomError"
import { HttpException } from "../exceptions/HttpException"
import { HttpAction } from "./HttpAction"

type HttpActionHandlerParams<Request, Response> = {
    action: HttpAction<Request, Response>,
    params: Request
}

type HttpActionHandlerReturn<Response> = {
    statusCode: number,
    body: Response | { message: string } | {}
}

const getUnkownError = (e: any) => {
    console.error({ erorr: e.name, message: e.message, trace: e.stack })
    return { 
        body: { message: 'Unkown Error try again later' },
        statusCode: 500,
        trace: e.stack
    }
}

export const httpActionHandler = async <Request, Response>(
    { action, params }: HttpActionHandlerParams<Request, Response>
): Promise<HttpActionHandlerReturn<Response>> => {
    try {
        const response = await action.execute(params)

        if(!response) return { body: {}, statusCode: 201 }

        return {
            body: response,
            statusCode: 200
        }
    } catch(e) {
        if(!(e instanceof CustomError)) return getUnkownError(e)
        
        switch(e.type) {
            case CustomErrorType.DOMAIN:
                console.error({ 
                    erorr: e.name,
                    message: e.message,
                    trace: e.stack
                })

                return {
                    body: { message: 'ServerError try again later' },
                    statusCode: 500
                }
            case CustomErrorType.HTTP_REQUEST:
                return {
                    body: { message: e.message },
                    statusCode: (e as HttpException).statusCode 
                }
            default: 
                return getUnkownError(e)
        }
    }
}