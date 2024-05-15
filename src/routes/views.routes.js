const { Router } = require('express')

const productManagerMongoose = require('../daos/productManagerMongoose.js')

const cartsManagerMongoose = require('../daos/cartsManagerMongoose.js')

const productManager = new productManagerMongoose();
const cartsManager = new cartsManagerMongoose();

const router = Router()

router.get('/products', async (req, res)=>{
    let { limit , nropage , disponibilidad, sort } = req.query

    if (typeof limit === "undefined") {
      limit = 10;
   }

   if (typeof nropage === "undefined") {
      nropage = 1;
   }
    if (typeof sort === "undefined") {
        sort = 1;
    }

    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await (productManager.getProducts(limit,nropage, sort));

    res.render('home', {productos:docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage
    })
})

 router.get('/carts/:cid', async (req, res)=>{
      const { cid } = req.params
      const carrito= await (cartsManager.getCartsById(cid));
      const productos = carrito.products
      res.render('carts', {productos})
 })

 router.post('/products', async (req, res) => {
    const {prodId , txtCantidad , carId} = req.body
    const cart = await cartsManager.getCartsById(carId)
    const result= await (cartsManager.addCarts(carId,prodId,txtCantidad));
    res.redirect('/carts/'+ carId)
    
}); 

router.get('/realtimeproducts',  async(req, res)=>{
    const { socketServer } = req

    socketServer.on('connection', async (socket) => {
         
        socket.on('eliminarProducto', async data=>{
            const { id } = data
            console.log ('socket', id)
            await productManager.deleteProduct(id)
         })      
       const productos= await (productManager.getProducts());
       socket.emit("cargarProductos",  productos);

    });

    res.render('realtimeproducts', { 
    })
   
})
module.exports = router