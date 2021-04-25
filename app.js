const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');

//Routes import
const authRoute = require('./routes/auth');

//middleware
app.use(express.json());

//Route middleware
app.use('/api', authRoute);

//Root route
app.get('/', (req, res) => {
  res.send('Welcome to the basic user system backend');
});

//Connect to the database
mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!!!'))
  .catch((err) => console.log('Could not connect with database...', err));

//App Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App up and running on port ${PORT}`));
