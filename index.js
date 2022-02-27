const express = require('express')
const res = require('express/lib/response')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const PORT = 3003
const fs = require('fs')

//middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//home
app.get('/',(req,res)=>{
  res.send('herro')
})

//lists all dinosaurs
app.get('/dinosaurs', (req,res)=>{
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // console.log(dinoData)
  //send to ejs file
  res.render('index.ejs', {myDinos: dinoData})
})

app.get('/dinosaurs/:idx', (req,res)=>{
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)

  //get array index from url parameter
  let dinoIndex = parseInt(req.params.idx)

  //render page with data of the specific animal
  res.render('show.ejs', {myDino: dinoData[dinoIndex]})
  // console.log(`idx:` +req.params.idx)
})

app.listen(PORT, ()=>{
  console.log(`can i do this?? and on PORT ${PORT}`)
})