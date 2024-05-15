const fs = require('fs')

class ProductManager
{
    #productos;
    #path;
       
    constructor(path){
        this.#path=path;
    }

    readFile = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.#path, 'utf-8')
            return JSON.parse(dataJson)            
        } catch (error) {
            return []
        }
    } 

    addProduct = async (title, description,price, thumbnail,code,stock,status, category) =>
    {
        try
        {
         this.#productos = await this.readFile()
       const producto= {
        id: this.#getNextId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock, 
        status,
        category
       } ;
     this.#productos.push(producto);
     await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
     console.log (`El producto Id ${producto.id} fue añadido corectamente`)
    } catch (error)
    {
        console.log(error.message)
    }

    }

    deleteProduct = async (id) =>
    { 
        try
        {
            this.#productos = await this.readFile()
            const indice = this.#productos.findIndex(prod => prod.id === id);
            if (indice === -1) {
               throw new Error(`No se puede eliminar el producto con id ${id}. El ID no existe.` );
            }
           const deletedProduct = this.#productos.splice(indice, 1);
           await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
        }catch (error)
        {
            console.log(error.message)
        }
    }

    updateProduct = async(prodUpdate) =>
      {
          this.#productos = await this.readFile()
          const indice = this.#productos.findIndex(prod => prod.id === prodUpdate.id);
          if (indice === -1) {
             throw new Error(`No se puede actualizar el producto con id ${id}. El ID no existe.` );
          }
         this.#updateFileFunction (prodUpdate, indice);
      }

    #updateFileFunction = async (obj, indice) => { 
        try {

            this.#productos[indice].title= obj.title;
            this.#productos[indice].description= obj.description;
            this.#productos[indice].price= obj.price;
            this.#productos[indice].thumbnail= obj.thumbnail;
            this.#productos[indice].code= obj.code;
            this.#productos[indice].stock= obj.stock;
                      
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
            console.log (`El producto con ID ${obj.id} fue modificado corectamente`)
        } catch (error) {
            console.log(error.message)
        }
    }

    getProducts = async ()=>{
        try
        {
            this.#productos= this.readFile();
            return (this.#productos);
        }catch (error)
        {
           console.log(error.message)
        }
    }

    getProductById = async (idProducto) => { 
     try {
            const result = await fs.promises.readFile(this.#path, 'utf-8')
            this.#productos=  JSON.parse(result);
           
            const producto = this.#productos.find((producto) => producto.id === idProducto);
            return producto;    
        } catch (error) {
            console.log(error.message)
        }
    }

    #getNextId() {
        if (this.#productos.length === 0) {
        return 1;
        }
        return this.#productos.at(-1).id + 1;
    }
}

module.exports = ProductManager;