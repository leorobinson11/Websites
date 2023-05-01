const express = require('express');

//express paths
const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended : true}));

//routes
const main = require("./routes/main.js");
const admin = require("./routes/admin.js");

app.use('/', main);
app.use('/admin', admin);

//catching errors
app.use((req, res, next) => {
    const err = new Error(`Page ${req.path} not Found`);
    err.status = 404;
    return next(err);
});

//handling the error
app.use((err, req, res, next) => {
    res.status(404).render('error', {err:err});
});

app.listen(3000);