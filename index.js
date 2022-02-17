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

/**HANDLEBARS
 * 
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'index'
}));

// app.set('views', './views')
app.set('view engine', 'handlebars')

app.use("/static", express.static(path.join(__dirname, 'public')))
app.use("/", homeRouter);
 */

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use("/static/", express.static(path.join(__dirname, '/ejs/public')))
//app.use("/", pugRouter)
app.use("/", ejsRouter)

app.listen(PORT)