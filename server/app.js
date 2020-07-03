const express = require('express')
const cors = require('cors')

var app = express()
app.use(cors())

app.get('/', (req, res) => {
    console.log('server side hitting')
    res.status(200).send('hello')
})

app.listen(8000, () => {
    console.log('running on port 8000')
})