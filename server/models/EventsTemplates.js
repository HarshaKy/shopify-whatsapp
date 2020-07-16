const mongoose = require('mongoose')

const EventsTemplates = mongoose.model('EventsTemplates', {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    events: [
        {
            eventName: { type: String },
            templateName: { type: String },
            templateText: { type: String },
            parameters: 
            {
                name: { type: String },
                orderid: { type: String },
                phone: { type: String }
            }
        }
    ]
})

module.exports = { EventsTemplates }