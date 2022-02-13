const path = require('path')
const { Router } = require('express');
const upload = require('../../multer')
const Producto = require('../models/Producto');

const router = new Router();

const producto = new Producto("./database/products.json");

router.get('/productos', async(req, res)=>{
    const products = await producto.getAll();
    res.render('index', { products });
})

router.get('/', (req, res)=>{
    res.render('nuevoProducto')
})

const validacionId = async () =>{
    let id = 1;
    const productos = await producto.getAll().then(products => {return products});
    if(productos.length > 0){
        const index = productos.length -1;
        const producto = productos[index];
        id = producto.id + 1;
        return id;
    }
    return id;
}

router.post('/productos', upload.single("thumbnail"), async(req, res)=>{
    const thumbnail = path.join("/static/img/" + req.file.filename);
    const { title, price} = req.body;
    let id = await validacionId();
    await producto.save({id, title, price, thumbnail});
    res.redirect("/");
})

module.exports = router 