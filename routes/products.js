const multer = require('multer')
const express = require('express')
const path = require('path')
const { Router } = express

let id = 0;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, ("../public/img")))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname +'-'+ Date.now())
    }
})

const upload = multer({ storage })
const router = Router()

products = [
    {
        id: id+=1,
        title: 'Detergente',
        price: 240,
        thumbnail: "imagen1"
    },
    {
        id: id+=1,
        title: 'Alcohol',
        price: 220,
        thumbnail: "imagen2"
    },
    {
        id: id+=1,
        title: 'Papas',
        price: 100,
        thumbnail: "imagen3"
    }
]

router.get("/", (req, res) =>{
    //res.send(movies.filter(m => m.title.includes(title)))
    res.status(200).send(products)
})

router.get("/productos", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/productos.html"))
})


router.get("/:id", (req, res) =>{
    const product = products.find(product => product.id == req.params.id)
    if(!product){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    res.send(product)
})

//POST

router.post("/", upload.single("thumbnail"), (req, res) =>{
    id+=1;
    const thumbnail = path.join(__dirname, "../public/img/"+ req.file.filename)
    const { title, price } = req.body
    products.push({id, title, price, thumbnail})
    res.send({id, title, price, thumbnail})
})

//PUT
router.put("/:id", (req, res) =>{
    const product = products.find(product => product.id == req.params.id)
    if(!product){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    const { title, price, thumbnail } = req.body
    product.title = title;
    product.price = price;
    product.thumbnail = thumbnail;
    res.sendStatus(200)
})

//DELETE
router.delete("/:id", (req, res) =>{
    const product = products.find(product => product.id == req.params.id)
    if(!product){
        res.status(404).send({ error : 'Producto no encontrado' })
        return
    }
    const index = products.indexOf(movie)
    products.splice(index, 1)
    res.sendStatus(200)
})

module.exports = router