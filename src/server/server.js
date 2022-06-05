const mysql = require("mysql2");
const express = require("express");
 
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlTucNado21041911im',
    database: 'OB2'
});

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.get("/projects", function(req, res){
    
    connection.query(
        'SELECT p.project_id, p.project_name, p.create_date, p.deadline, p.price, p.descr, c.customer_name FROM projects p inner join customers c on p.customer_id = c.customer_id;',
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.get("/users", function(req, res){
    connection.query(
        'SELECT p.project_id, p.project_name, p.create_date, p.deadline, p.price, p.descr, c.customer_name FROM projects p inner join customers c on p.customer_id = c.customer_id;',
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});


app.listen(3001, () => {
    console.log("Сервер запущен на 3001 порту");
});