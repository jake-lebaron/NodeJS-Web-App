let express = require("express");
let path = require('path');
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Nimbus2017!",
    database: "vehicle",
    port: 5432
  }
});

let app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));

app.set('views', './views');
app.set("view engine", "ejs");

app.get('/', (req, res) => res.render(path.join(__dirname + '/views/index.ejs')));

app.get('/edit', (req, res) => {
  /*knex("vehicles").where('vehicle_id', req.params.id).then(vehicles => {*/
  res.render(path.join(__dirname + '/views/editVehicle.ejs')/*, { vehicles: vehicles });
  });*/
  )
});

app.get('/displayVehicles', (req, res) => {
  knex.select().from("vehicles").then(vehicles => {
    res.render(path.join(__dirname + '/views/displayVehicle.ejs'), { vehicles: vehicles });
  });
});

app.post('/delete/:id', (req, res) => {
  knex("vehicles").where("vehicle_id", req.params.id).del().then(val => {
    knex('vehicles').then(vehicles => {
      res.render(path.join(__dirname + '/views/displayVehicle.ejs'), { vehicles: vehicles });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  })
})

app.get('/addVehicle', (req, res) => {
  res.render("addVehicle");
});

app.post("/addVehicle", (req, res) => {
  //I need to add the rest of the data in here, but I don't want to do it until I'm
  //sure that it's working. 
  //I also need to get the then sent back to the right spot
  knex("vehicles").insert({ year: req.body.description }).then()
})
app.listen('3000', () => console.log('Server running on port 3000'));