const multer = require('multer')
const express = require('express')
const path = require('path')
const { Router } = express
const Contenedor = require('../models/contenedor');
const instancia = new Contenedor("./database/products.json");

//instancia.getAll().then(products => console.log(products));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, ("../public/img")))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const router = Router()

router.get("/", async (req, res) =>{
    const productos = await instancia.getAll().then(products => {return products});
    res.status(200).send(productos);
})

router.get("/nuevo", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/productos.html"))
})

router.get("/:id", async (req, res) =>{
    const product = await instancia.getById(req.params.id).then(product => {return product});
    if(!product){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    res.send(product);
})

//POST

const validacionId = async () =>{
    let id = 1;
    const productos = await instancia.getAll().then(products => {return products});
    if(productos.length > 0){
        const index = productos.length -1;
        const producto = productos[index];
        id = producto.id + 1;
        return id;
    }
    return id;
}

router.post("/", upload.single("thumbnail"), async (req, res) =>{
    const thumbnail = path.join(__dirname, "../public/img/"+ req.file)
    const { title, price } = req.body;
    let id = await validacionId();
    const product = await instancia.save({id, title, price, thumbnail})
    if(product){
        res.status(201).send(product);
    }
})

//PUT
/*router.put("/:id", (req, res) =>{
    const product = await instancia.update(product).then(product => {return product});
    //const product = products.find(product => product.id == req.params.id)
    if(!product){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    const { title, price, thumbnail } = req.body
    product.title = title;
    product.price = price;
    product.thumbnail = thumbnail;
    res.sendStatus(200)
})*/

//DELETE BY ID
router.delete("/:id", (req, res) =>{
    const productDelete = instancia.deleteById(req.params.id);
    if(!productDelete){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    res.sendStatus(200);
})

module.exports = router

//res.send(movies.filter(m => m.title.includes(title)))