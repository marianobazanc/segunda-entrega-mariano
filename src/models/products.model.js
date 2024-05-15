const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String
    },
    stock: Number,
    status: Boolean,
    category: String
})
productsSchema.plugin(mongoosePaginate)

const productsModel = model('products', productsSchema)

module.exports = productsModel;
