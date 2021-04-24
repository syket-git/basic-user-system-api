const express = require('express');
const app = express();

//Routes import
const authRoute = require('./routes/auth');

//Router middleware
app.use('/api', authRoute);

//Root route
app.get('/', (req, res) => {
  res.send('Welcome to the basic user system backend');
});

//App Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App up and running on port ${PORT}`));
