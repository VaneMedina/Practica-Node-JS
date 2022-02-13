const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080

//const pugEngine = require('./pug/engine/pug');
const ejsEngine = require('./ejs/engine/ejs');

//pugEngine(app);
ejsEngine(app);
//const pugRouter = require('./pug/routes/pug');
const ejsRouter = require('./ejs/routes/ejs');


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use("/static/", express.static(path.join(__dirname, '/ejs/public')))
//app.use("/", pugRouter)
app.use("/", ejsRouter)

app.listen(PORT)