const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;
const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Fetch data from the "fooditems" collection
    const fetched_data = await mongoose.connection.db.collection("products").find({}).toArray();
    global.products = fetched_data;
    // console.log(global.products);

    const products_category = await mongoose.connection.db.collection("products_category").find({}).toArray();
    global.products_category = products_category;
    // console.log(global.products_category);

    // Return fetched data or use it in further processing
    // return fetched_data;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};

module.exports = mongoDB(); // Exporting the function without executing it


