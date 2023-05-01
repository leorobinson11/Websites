const express = require('express');

//database
const query = require("../database.js");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/description', (req, res) => {
    res.render('description');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/conformation', async (req, res) => {
    res.render('conformation');
    // The user making a request
    const mess = req.body
    let sql = `INSERT INTO Messages SET ?;`;
    try {
        const sqlres = await query(sql, mess);
    } catch (err) {
        console.log(err)
    }
});

router.get('/blog', (req, res) => {
    const posts = [{title:'Post1',date:'6.4.2023',description:'How to ...'}];
    res.render('blog', {posts:posts});
});

module.exports = router;