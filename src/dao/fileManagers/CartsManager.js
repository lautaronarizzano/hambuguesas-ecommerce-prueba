import fs from 'fs'
import __mainDirname from '../../utils/utils.js';

export default class CartManager {
    constructor() {
        this.path = `${__mainDirname}/dao/files/Carts.json`
    }

    //funcion leer carts
    getAll = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)
        return carts
    }

    addCart = async () => {
        const carts = await this.getAll()

        try {
            const cart = {
                products
            }

            if (products.length === 0) {
                product._id = 1
            } else {
                product._id = products[products.length - 1]._id + 1
            }

            carts.push(cart)

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

            return cart

        } catch (error) {
            console.log(error)
        }
    }

    getById = async (cid) => {
        const carts = await this.getAll()

        const cartFind = carts.find(c => c._id === cid)
        if (cartFind == undefined) {
            console.error('Not found')
            return
        } 
            return cartFind
    }

    addProduct = async (cid, pid) => {
        const carts = await this.getCarts()
        try {
            const cart = carts.find(c => c._id === cid)
            if(cid > carts.length || !cart) return console.log("cart id doesn't exist")
            
            function addPost(post) {

                const existingPost = cart.products.find(p => p.product === post);
    
                if (existingPost) {
    
                    // Actualizar post existente
    
                    existingPost.product = pid;
    
                    existingPost.quantity += 1;
                } else {
    
                    // Agregar nuevo post
                    cart.products.push({
                        product: post,
                        quantity: 1
                    });
                }
            }
            addPost(pid)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        } catch (error) {
            console.log(error)
        }
    }

}