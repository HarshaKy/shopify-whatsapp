const mongoose = require('mongoose')

const Shop = mongoose.model('Shop', {
    shopUrl: {
        type: String,
        unique: true
    },
    shopHost: {
        type: String,
        unique: true
    },
    shopName: {
        type: String
    },
    shopEmail: {
        type: String
    },
    whatsappCredentials: {
        whatsappNumber: {type: String},
        whatsappApiKey: {type: String}
    },
    templateChoices: {
        orderDelivered: {type: String},
        orderConfirmed: {type: String},
        abandonedCart: {type: String},
        paymentConfirmation: {type: String}
    }
})

module.exports = { Shop }