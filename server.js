//INSTALLATION: express body-parser mongoose nodemon
//Create a schema and model
//connect to database
// GET => takes an empty object and a callback with error or notes Note.find({}, (err, notes)=>)
// POST => create a new object and save
// PUT => takes two objects, first obj is the target second is the replacement
// DELETE => takes object with _id and callback with error or notes

const app = require("express")();
const express = require("express");
const PORT = process.env.PORT || 3000;
const Note = require("./model");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");

// database connected
mongoose.connect("mongodb://codesmith1:testing1@ds121099.mlab.com:21099/todo");

//bodyparser will parse the request body in json
app.use(bodyParser.json());

app.use(express.static("public"));

//Serves all the request which includes /images in the url from Images folder
// app.use("/", express.static(__dirname + "/index.html"));
// app.use("/index.css", express.static(__dirname + "index.css"));
// app.use("/index.js", express.static(__dirname + "index.js"));

//***DISPLAY ALL REQUEST***/
app.get("/notes", (req, res) => {
  let notes = Note.find({}, (err, notes) => {
    if (err) throw err;
    res.send(notes);
  });
});

//***ADD REQUEST***/
app.post("/notes", (req, res) => {
  let newNote = new Note({
    title: req.body.title,
    text: req.body.text
  });
  newNote.save();
  res.end("Success");
});

//***DELETE REQUEST***/
app.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  Note.findByIdAndRemove({ _id: req.params.id }, err => {
    if (err) throw err;
    res.send("Finished deleting");
  });
});

//***PUT REQUEST***/
app.put("/notes/:id", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, text: req.body.text },
    (err, note) => {
      if (err) throw err;
      res.end(note);
    }
  );
  res.send("Success");
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
