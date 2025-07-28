require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//set up express app
const app = express();

//Allows your frontend to talk to the backend
app.use(cors());  


//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.Promise = global.Promise;

app.use(express.static('public'));


app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
   // console.log(err);
   res.status(422).send({error: err.message});
    
})

//listen for requests
app.listen(process.env.PORT || 5000, function(){
    console.log("now listening for requests");
});