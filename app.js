const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const { connected } = require("process");
mongoose.connect('mongodb://localhost/dance', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 8000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.get('/', function (req, res) {
//     res.render('index.pug')
//   });
app.get('/', function (req, res) {
  const para = {
    'title': 'Home'
  }
  res.render('home.pug',para)
});
// app.post('/contact', (req,res)=>{
//   console.log(req.body);
//   res.status(200).render('contact.pug');
// });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected")
});
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});
const Contact = mongoose.model('Contact', contactSchema);
app.post('/contact', (req, res) => {
  const para = {
    'title': 'Contact'
  }
  const mydata = new Contact(req.body);
  // mydata.save().then(()=>{
  //   res.send("This item has been saved successfully")

  // }).catch(()=>{
  //   res.send("Item has not been saved")
  // });
  res.status(200).render('contact.pug', para);
});
app.get('/contact', function (req, res) {
  const para = {
    'title': 'Contact'
  }
  res.render('contact.pug',para)
});


app.listen(port, () => {
  console.log(`the application is running on port ${port}`)
});