const fs = require("fs")
class CartsManager
{
    #carts
    #path
       
    constructor(path)
    {
        this.#path = path
    }

    readFile = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.#path, 'utf-8')
            return JSON.parse(dataJson)            
        } catch (error) {
            return []
        }
    } 

    createCart = async () =>
    {
    try
        {
            this.#carts = await this.readFile()
        
            const cart= {
                    id: this.#getNextId(),
                    products: [],
            } ;
            this.#carts.push(cart);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'), 'utf-8')
            console.log (`El carrito Id ${cart.id} fue ingresado corectamente`)
    } catch (error)
    {
        console.log(error.message)
    }
    }
   

    /** @returns {number} */
    #getNextId() {
        if (this.#carts.length === 0) {
        return 1;
        }
        return this.#carts.at(-1).id + 1;
    }


    getCartsById = async (idCarrito) => { 
        try {
               const result = await fs.promises.readFile(this.#path, 'utf-8')
               this.#carts=  JSON.parse(result);
              
               const carrito = this.#carts.find((carrito) => carrito.id === idCarrito);
                              
               return carrito;    
           } catch (error) {
               console.log(error.message)
           }
       }

       addCarts = async(idCarrito, nuevoProducto) =>
      {
          this.#carts = await this.readFile()

          const carrito = this.#carts.find((carrito) => carrito.id === idCarrito);
          const indexCart = this.#carts.findIndex(carr => carr.id === idCarrito);
      
          const indexProduct = carrito.products.findIndex(prod => prod.id === nuevoProducto.id);
          if (indexProduct === -1) 
          {
            carrito.products.push(nuevoProducto)
          }
          else {
            carrito.products[indexProduct].quantity++;
          }
   
          this.#carts[indexCart]= carrito;
          await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'), 'utf-8')
      }
}

module.exports = CartsManager;