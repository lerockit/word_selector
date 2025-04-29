import express from 'express'
import env from '../../configs/env'
import { insertWordsByValuesHttpActionFactory } from '../../factories/insertWordsByValuesHttpActionFactory'
import { httpActionHandler } from './actions/httpActionHandler'
import { InsertWordRequestModel, InsertWordResponseModel } from './model/InsertWordsRequest'

const app = express()
app.use(express.json())

app.post('/insert-words', async ({ body }, res) => {
    const action = await insertWordsByValuesHttpActionFactory()
    const response = await httpActionHandler<InsertWordRequestModel, InsertWordResponseModel>({
        action,
        params: {
            wordsValues: body.words
        }
    })

    res.status(response.statusCode)
    res.json(response.body)
})

app.listen(env.appPort, () => {
    console.log(`server listening on port ${env.appPort}`)
})