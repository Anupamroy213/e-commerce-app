
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
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
// app.use('/api', require("./Routes/MyOrderData"));
// app.use('/api', require("./Routes/Createuser1"));
app.use('/', require("./Routes/auth"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  
  
 
