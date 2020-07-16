const mongoose = require('mongoose')

const EventsTemplates = mongoose.model('EventsTemplates', {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    event: [{
        name: { type: String },
        label: { type: String },
        value: { type: String },
        templates: [{
            name: { type: String },
            label: { type: String },
            value: { type: String }
        }]
    }]
})

module.exports = { EventsTemplates }