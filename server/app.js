require('./config/config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

let { mongoose } = require('./db/mongoose')
let { WhatsappCredentials } = require('./models/shopWhatsappCred')

var app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('server side hitting')
    console.log(req.headers)
    res.status(200).send('hello')
})

app.post('/whatsappInfo', (req, res) => {
    let body = req.body
    let whatsappCred = new WhatsappCredentials(body)
    console.log('body', body)
    whatsappCred.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.listen(8000, () => {
    console.log('running on port 8000')
})