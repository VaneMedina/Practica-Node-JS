const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080

const products = require('./routes/products')

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

//app.use("/static", express.static(path.join(__dirname, 'public')))
app.use("/api/products", products)

app.listen(PORT, () => {console.log(`escuchando en el puerto ${PORT}`)})