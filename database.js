const mysql = require('mysql');
const dotenv = require('dotenv');
const util = require('util');

dotenv.config({ path: 'marketingdb.env'});

const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_ROOT,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
}); 

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL connected...');
});

//so that sql can be used with await
const query = util.promisify(db.query).bind(db);

module.exports = query