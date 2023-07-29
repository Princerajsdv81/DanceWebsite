const express = require('express');
const path=require("path");
const app = express();
const port = 8000;
//for mongoose to connect
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}




//define mongoose schema
const connectSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const contact = mongoose.model('contact', connectSchema);

//Express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine','pug');  //set the templet engine as pug
app.set('views',path.join(__dirname,'views'));// the the views directory

//EndPoint
app.get('/', (req, res) => {
    const params={};
    res.status(200).render('home.pug',params);
  });
app.get('/contact', (req, res) => {
    const params={};
    res.status(200).render('contact.pug',params);
  });
app.post('/contact', (req, res) => {
  var myData=new contact(req.body);
  myData.save().then(() =>{
    res.send("This item has been saved to the database.");
  }).catch(()=>{
    res.status(400).send("Item was not saved to the database")
  })
    // res.status(200).render('contact.pug');
  });

  //start the server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })