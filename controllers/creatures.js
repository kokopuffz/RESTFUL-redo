let express = require("express");
const { append } = require("express/lib/response");
let router = express.Router();
const fs = require("fs");

router.get('/',(rec,res)=>{
  let creatures=fs.readFileSync('./prehistoric_creatures.json')
  let creaturesData=JSON.parse(creatures)
  console.log(creaturesData)
})


module.exports=router