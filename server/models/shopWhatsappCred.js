const mongoose = require('mongoose')

const WhatsappCredentials = mongoose.model('WhatsappCredentials', {
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
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