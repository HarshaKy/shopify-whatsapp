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
    }
})

module.exports = { Shop }