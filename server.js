if (process.env.NODE_ENV !== 'production') {
    require('dotenv')
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

mongoose.connect('mongodb://localhost/mybrary', {useNewUrlParser: true});
const db = mongoose.connection; 
db.on('error', console.error.bind('error', 'connection error'));
db.once('open', function () {
    console.log('Connected to db...');
    app.listen(process.env.PORT || 3000, () => console.log(`Listening to the port 3000...`));
})

