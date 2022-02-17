const express = require('express');
const path = require('path');
const { Router } = express;
const router = Router();

const Producto = require('../models/Producto');
const productModel = new Producto("./database/products.json");
const upload = require('../../multer')

router.get("/", (req, res) => {
    res.render("products")
})

router.get("/productos", async (req, res) => {
    const productos = await productModel.getAll()
    res.render('main', { productos })
})

router.post("/productos", upload.single("thumbnail"), async (req, res) => {
    const { title, price} = req.body;
    const thumbnail = path.join("static/img/" + req.file.filename)
    await productModel.save(title, price+"$", thumbnail).then(id =>{return id});
    res.redirect('/productos')
})


module.exports = router;