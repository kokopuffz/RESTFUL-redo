let express=require('express')
let router=express.Router()
const fs = require("fs");


router.get("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  let nameFilter = req.query.nameFilter;
  //if there is a query
  if (nameFilter) {
    //filter out all dinos who dont have the queried name
    dinoData = dinoData.filter(
      (dino) => dino.name.toLowerCase() === nameFilter.toLowerCase()
    );
  }
  res.render("./dinosaurs/index.ejs", { myDinos: dinoData });
});

//lists all dinosaurs
router.get("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // console.log(dinoData)
  //send to ejs file
  res.render("index.ejs", { myDinos: dinoData });
});

router.get("/new", (req, res) => {
  res.render("./dinosaurs/new.ejs");
});

router.get("/:idx", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  //get array index from url parameter
  let dinoIndex = parseInt(req.params.idx);

  //render page with data of the specific animal
  res.render("./dinosaurs/show.ejs", { myDino: dinoData[dinoIndex] });
  // console.log(`idx:` +req.params.idx)
});

router.post("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //add item to dinosaurs array
  dinoData.push(req.body);
  //save dino to the data.json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  res.redirect("./dinosaurs");
});

module.exports=router