// express
const express = require('express');
const app = express();
const router = express.Router();
// mongoose
const mongoose = require('mongoose');
mongoose.Promise  = global.Promise;
// inits
const path = require('path');
// const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
// imports
const config = require('./configs/constants');
const routes = require('./routes/baseRoutes')(router);	


mongoose.connect(config.url,{ useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false},(err)=>{
    if(err){
        console.log("Could not connect to the database" + err);
    }else{
        console.log("Connected to database ");
    }
  });

app.use(cors({ origin: 'https://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded());
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);
app.use(express.static(__dirname+'/public'));
app.use('/service',routes);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(config.port, () => {
  console.log(`Server started on port `, config.port);
});