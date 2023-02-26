const express = require('express')
const bodyParser = require('body-parser')
// const { text } = require('body-parser')
const app = express()
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000
var record = []
app.get('/', (req, res) => {
    res.send(record)
})
app.post('/', (req, res) => {
    let data = req.body;
    record.push(data)
    res.send(record);
})
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const recordToDelete = record.find(p => p.id == id);
    if (!recordToDelete) {
        return res.send({ message: 'Not a valid ID' })
    }
    const projectIndex = record.findIndex(p => p.id == id);
    record.splice(projectIndex, 1);
    return res.send(record);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})