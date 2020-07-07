require('./config/config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const _ = require('lodash')

let { mongoose } = require('./db/mongoose')
let { WhatsappCredentials } = require('./models/shopWhatsappCred')
let { Shop } = require('./models/shop')
const shop = require('./models/shop')

var app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('server side hitting')
    console.log(req.headers)
    res.status(200).send('hello')
})

app.get('/shops', (req, res) => {
    let shopHost = _.pick(req.query, ['shopHost'])
    
    Shop.findOne({
        "shopHost": shopHost.shopHost
    }).then((doc) => {
            res.status(200).json(doc)
    })
})

app.post('/shop', (req, res) => {
    let body = req.body.shop
    
    let shop = new Shop(body)
    shop.save().then((doc) => {
        res.status(200).send(doc)
    }, (err) => {
        res.status(404).send(err)
    })
})

app.post('/whatsappInfo', (req, res) => {
    let body = req.body
    let whatsappCred = new WhatsappCredentials(body)
    whatsappCred.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.listen(8000, () => {
    console.log('running on port 8000')
})