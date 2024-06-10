const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Anmol:TCA1909063%40@cluster0.9pdw85q.mongodb.net/?retryWrites=true&w=majority&appName=natours")
  .then(() => {
    console.log(`connection successful`);
  }).catch((err) => {
    console.log(err.errmsg);
  });
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
