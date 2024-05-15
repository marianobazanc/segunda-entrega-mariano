const { Schema, model } = require('mongoose')

const messagesSchema = new Schema({
    user: String,
    message: String
})

const messagessModel = model('messages', messagesSchema)

module.exports = messagessModel;


