const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
  products: {
      type: [{
          product: {
              type: Schema.Types.ObjectId,
              ref: 'products'
          },
          quantity: Number
      }]
  }
})

CartSchema.pre('findOne', function() {
  this.populate('products.product')
})

CartSchema.pre('find', function() {
  this.populate('products.product')
})

const cartsModel = model('carts', CartSchema)

module.exports = cartsModel;