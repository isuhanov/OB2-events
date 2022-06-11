const mysql = require("mysql2");
const express = require("express");
const bodyParser = require('body-parser')
 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
   
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


app.get("/workers", function(req, res){
    let query;
    if (req.query.pr_id) {
        query = `SELECT w.* FROM workers w inner join workers_projects wp on w.worker_id = wp.worker_id inner join projects p on p.project_id = wp.project_id where p.project_id = ${req.query.pr_id};`;
    } else {
        query = 'SELECT * FROM workers;'
    }
    
    connection.query(
        query,
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.delete("/workers/delete", function(req, res){
    connection.query(
        `delete from workers where worker_id = ${req.query.worker_id};`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});

app.post('/worker', function(req, res){
    connection.query(
        `INSERT INTO Workers(FIO, bd, phone, email, post, salary) VALUES ('${req.body.fio}', '${req.body.bd}', '${req.body.phone}', '${req.body.email}', '${req.body.post}', ${req.body.salary});`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});




app.listen(3001, () => {
    console.log("Сервер запущен на 3001 порту");
});