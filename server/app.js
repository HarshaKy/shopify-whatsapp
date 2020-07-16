require('./config/config')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const _ = require('lodash')
const Liquid = require('liquid')
const engine = new Liquid.Engine()

let { mongoose } = require('./db/mongoose')
let { Shop } = require('./models/shop')

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
    let body = {
        whatsappCredentials: {
            whatsappNumber: req.body.whatsappNumber,
            whatsappApiKey: req.body.whatsappApiKey
        }
    }
    console.log(body)
    let shopId = req.body.shopId
    let filter = {_id: shopId}
    
    Shop.findOneAndUpdate(filter, body, {new: true}).then((doc) => {
        console.log(doc)
        res.status(200).send(doc)
    }, (err) => {
        res.status(404).send(err)
    })
})

app.post('/templateChoices', (req, res) => {
    let templates = {
        templateChoices: {
            orderDelivered: req.body.templateChoicesFromClient.orderDeliveredSelection,
            orderConfirmed: req.body.templateChoicesFromClient.orderConfirmedSelection,
            abandonedCart: req.body.templateChoicesFromClient.abandonedCartSelection,
            paymentConfirmation: req.body.templateChoicesFromClient.paymentConfirmationSelection
        }
    }

    let filter = {_id: req.body.shop}

    Shop.findOneAndUpdate(filter, templates, {new: true}).then((doc) => {
        console.log(doc)
        res.status(200).send(doc)
    }, (err) => {
        res.status(404).send(err)
    })
})

app.post('/templateText', (req, res) => {
    // console.log('POST templateText')
   
    let templateText = req.body.templateText

    engine
        .parse(templateText)
        .then((template) => {
            if(template.root.nodelist.length > 1) {
                let variables = []

                for(var item of template.root.nodelist) {
                    if(item.name) {
                        variables.push(item.name)
                    }
                }
                console.log(variables)

                res.status(200).json(variables)
            } else {
                console.log('no variables')

                res.status(200).json([])
            }
        })
})

app.listen(8000, () => {
    console.log('running on port 8000')
})