const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");

//database
const query = require("../database.js");
const router = express.Router();

const SECRET = "NEVER EVER MAKE THIS PUBLIC IN PRODUCTION!";

router.route('/login')
.get((req, res) => {
    //login page
    res.render('admin/login')
})
.post(async (req, res) => {
    //username and password entered by the user
    const { username, password } = req.body;
    let sql = `SELECT Password from Passwords WHERE Username="${username}"`;
    try {
        const sqlres = await query(sql);
        if(sqlres.length === 0) {
            res.redirect("/admin/invalid");
        } else {
            console.log(sqlres.length);
            //username from the database
            const realpassword = sqlres[0].Password;
            //encripting
            const arethesame = await bcrypt.compare(password, realpassword);
            if(arethesame) {
                const token = jwt.sign(
                    { username: username },
                    SECRET,
                    { expiresIn: 60 * 60 }
                );
                res.redirect('/admin/messages');
            } else {
                res.redirect("/admin/invalid");
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/Invalid', (req, res) => {
    res.render('admin/invalid')
});

const authenticateToken = (req) => {
    try {
        const authHeaderValue = req.headers.authorization;
        const token = jwt.verify(authHeaderValue, SECRET);
        return true;
      } catch (e) {
        return false;
      }
};

router.get('/messages', async (req, res) => {
    // getting all the users requests
    let authenticated = authenticateToken(req);
    if (authenticated) {
        let sql = 'SELECT * from Messages';
        try {
            const sqlres = await query(sql);
            res.render('admin/messages', {results:sqlres});
        } catch (err) {
            console.log(err)
        }
    } else {
        
    }
});

router.get('/messages/:id', async (req, res) => {
    //deleting message
    const { id } = req.params
    let sql = `DELETE FROM Messages WHERE ID='${id}'`;
    try {
        const sqlres = await query(sql)
    } catch (err) {
        console.log(err);
    }
    res.redirect('/admin/messages');
});

module.exports = router;