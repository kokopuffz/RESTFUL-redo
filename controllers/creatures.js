let express = require("express");
const res = require("express/lib/response");
const { append } = require("express/lib/response");
let router = express.Router();
const fs = require("fs");

router.get('/',(req,res)=>{
  let creatures=fs.readFileSync('./prehistoric_creatures.json')
  let creaturesData=JSON.parse(creatures)

  let nameFilter=req.query.nameFilter
  if (nameFilter) {
    //filter out all the creatures who dont have queried name
    creaturesData=creaturesData.filter(creature=>{
      return creature.name.toLowerCase() === nameFilter.toLowerCase()
    })
  }
  res.render('./creatures/index.ejs', {myCreatures: creaturesData})
})

router.get("/new", (req, res) => {
  res.render("./creatures/new.ejs");
});

router.get('/:idx',(req,res)=>{
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);
  let creatureIdx = req.params.idx
  res.render('./creatures/show.ejs', {creature: creaturesData[creatureIdx]})
})

router.post('/',(req, res)=>{
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);

  //add item to creature to array
  creaturesData.push(req.body);
  //save creature to the data.json file
  fs.writeFileSync("./creatures.json", JSON.stringify(creaturesData));
  res.redirect("./creatures");
})

module.exports=router