// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',    
//     user: 'root',         
//     password: 'vedant2508', 
//     database: 'dbms_mini_project'
// });

// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database: ' + err.stack);
//       return;
//     }
//     console.log('Connected to the database');
// });

// module.exports = connection;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',    
    user: 'root',         
    password: 'vedant2508', 
    database: 'dbms_mini_project'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
