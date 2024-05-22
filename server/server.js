
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
require('./db');

const cors = require('cors');

const allowedOrigins = ['https://e-commerce-app-bay-seven.vercel.app/'];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps, curl, etc)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));




app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
// app.use('/api', require("./Routes/MyOrderData"));
// app.use('/api', require("./Routes/Createuser1"));
app.use('/', require("./Routes/auth"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  
  
 
