const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const TransactionModel = require('./models/Transactions')
mongoose.connect("mongodb+srv://yangpu2007360:<password>.r0enknq.mongodb.net/transactionrecords?retryWrites=true&w=majority")
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000
app.get('/', (req, res) => {
    TransactionModel.find({}).then((response) => {
        res.send(response)
    })
})

app.post('/', async (req, res) => {
    const newRecord = new TransactionModel({
        id: req.body.id,
        text: req.body.text,
        amount: req.body.amount
    })
    await newRecord.save()
    res.send(newRecord)
})
app.delete('/:id', async (req, res) => {
    TransactionModel.find({ id: req.params.id }).then((response) => {
        if (response.length == 0) {
            res.send("no such id!!!")
            return
        }
    })
    try {
        await TransactionModel.deleteOne({ id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Error" })
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
