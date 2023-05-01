var mysql = require('mysql');
const bcrypt = require('bcrypt');

/*
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : ''
}); 
*/

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'marketingdb'
}); 

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL connected...');
});


//Create DB
const createDB = () => {
    let sql = 'CREATE DATABASE IF NOT EXISTS marketingdb;'
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.log(res);
        console.log('Database created...');
    });
};

const createMessageTable = () => {
    let sql = `CREATE TABLE IF NOT EXISTS Messages (
                ID int NOT NULL AUTO_INCREMENT,
                Name varchar(25), 
                Email varchar(50),
                Phonenumber varchar(25),
                Company varchar(25),
                Message varchar(300),
                PRIMARY KEY (ID)
               );`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.log(res);
        console.log('Table created...');
    });
};

const createPasswordTable = () => {
    let sql = `CREATE TABLE IF NOT EXISTS Passwords (
                Username varchar(25) NOT NULL,
                Password varchar(100) NOT NULL
              );`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.log(res);
        console.log('Table created...');
    });
}

const addPasswords = () => {
    const saltRounds = 12;
    const username = 'LeoR';
    const password = '2242'
    bcrypt.genSalt(saltRounds)
    .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        let sql = `INSERT INTO Passwords (Username, Password)
                    VALUES ("${username}", "${hash}") ;`;
        db.query(sql, (err, res) => {
                if(err) throw err;
                console.log(res);
                console.log('Password added');
        }); 
    })
    .catch(err => console.error(err.message))
}

//createDB();
//createMessageTable();
//createPasswordTable();
addPasswords();