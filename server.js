//This exercise is about apis calls using express;

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
let PORT = 3000;

//set up app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];

// Routes for apis
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

// api route
app.get('/api/characters', function(req, res){
    //This gives you the whole data base.
    return res.json(characters);
});

app.get('/api/characters/:char', function(req, res){
    //connect to db and make a sequelized call to the db to get your character
    //this gives you a character at a time
    let chosen = req.params.char;
    
    for (var i = 0; i < characters.length; i++){
        if (chosen === characters[i].routeName){
            return res.json(characters[i]);
        }
    }
    return res.send('no character found');
});

// create or post new characters to the database
app.post('/api/characters', function(req, res){
    let newcharacter = req.body;
    console.log(req);
    characters.push(newcharacter);
    res.json(newcharacter);
});

// Listener
app.listen(PORT, function(){
    console.log('App listening on PORT' + PORT);
});


