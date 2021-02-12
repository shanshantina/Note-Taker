const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// create the server at port 3001
const PORT = process.env.PORT || 3001;
const app = express();

// set middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// use public folder and files in there
app.use(express.static('public'));

// use api and html files from routes folder
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// set the server port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});