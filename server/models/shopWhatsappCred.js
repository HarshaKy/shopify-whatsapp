const mongoose = require('mongoose')

var WhatsappCredentials = mongoose.model('WhatsappCredentials', {
    whatsappNumber: {
        type: String,
        required: true,
        trim: true
    },
    whatsappApiKey: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = { WhatsappCredentials }