const express = require('express')
const res = require('express/lib/response')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const PORT = 3003
const fs = require('fs')
const methodOverride=require('method-override')

//middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(methodOverride('_method'))
//to parse req.body
app.use(express.urlencoded({extended:false}))

//controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/creatures'))
//home


app.listen(PORT, ()=>{
  console.log(`can i do this?? and on PORT ${PORT}`)
})