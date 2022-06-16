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
  

// ----------------- PROJECTS ------------------------------

app.get("/projects", function(req, res){
    connection.query(
        'SELECT p.project_id, p.project_name, p.create_date, p.deadline, p.price, p.descr, p.status, c.customer_name FROM projects p inner join customers c on p.customer_id = c.customer_id;',
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.get("/project", function(req, res){    
    connection.query(
        `SELECT * FROM projects WHERE project_id = ${req.query.project_id}`,
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.post('/project', function(req, res){
    // console.log(req.body);
    connection.query(
        `INSERT INTO projects (project_name, create_date, deadline, price, descr, status, customer_id)  values ('${req.body.name}', '${req.body.crDate}', '${req.body.deadline}', ${req.body.price}, '${req.body.descr}', '${req.body.status}', ${req.body.customerName});`,
        function(err, results, fields) {
            // console.log(err);
            // console.log(results);
            // console.log(fields);
            res.send(results);
        }
    ); 
});

app.put('/project', function(req, res){
    connection.query(
        `UPDATE projects SET project_name = '${req.body.name}', create_date = '${req.body.crDate}', deadline = '${req.body.deadline}', price = '${req.body.price}' , descr = '${req.body.descr}', status = '${req.body.status}' WHERE project_id = ${req.query.project_id}`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});


// ----------------- EVENTS ------------------------------

app.get("/events", function(req, res){
    connection.query(
        `SELECT ev.*, (SELECT p.project_name FROM projects p WHERE p.project_id = ev.project_id) as project_name FROM oevents ev`,
        // 'SELECT p.project_id, p.project_name, p.create_date, p.deadline, p.price, p.descr, p.status, c.customer_name FROM projects p inner join customers c on p.customer_id = c.customer_id;',
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.delete("/event", function(req, res){
    connection.query(
        `delete from oevents where event_id = ${req.query.event_id};`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});

// ----------------- CUSTOMERS ------------------------------

app.get("/customers", function(req, res){
    connection.query(
        'SELECT * FROM Customers',
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.get("/customer", function(req, res){
    let query;
    if (req.query.c_id) {
        query = `SELECT * FROM customers WHERE customer_id = ${req.query.c_id};`
    } else if (req.query.customer_name) {
        query = `SELECT * FROM customers WHERE customer_name = ${req.query.customer_name};`
    }
    connection.query(
        query,
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

// app.post('/customer', function(req, res){
//     connection.query(
//         // `INSERT INTO Workers(FIO, bd, phone, email, post, salary) VALUES ('${req.body.fio}', '${req.body.bd}', '${req.body.phone}', '${req.body.email}', '${req.body.post}', ${req.body.salary});`,
//         function(err, results, fields) {
//             res.send(err);
//         }
//     ); 
// });

// ------------------ WORKERS --------------------------------

app.get("/workers", function(req, res){
    let query;
    if (req.query.pr_id) {
        query = `SELECT w.* FROM workers w inner join workers_projects wp on w.worker_id = wp.worker_id inner join projects p on p.project_id = wp.project_id where p.project_id = ${req.query.pr_id};`;
    } else if (req.query.event_id) {
        query = `SELECT w.* FROM workers w inner join workers_events we on w.worker_id = we.worker_id inner join oevents ev on ev.event_id = we.event_id where ev.event_id = ${req.query.event_id};`;
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

app.get("/worker", function(req, res){    
    connection.query(
        `SELECT * FROM workers WHERE worker_id = ${req.query.w_id}`,
        function(err, results, fields) {
            res.send(results);
        }
    ); 
});

app.delete("/worker", function(req, res){
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

app.put('/worker', function(req, res){
    connection.query(
        `UPDATE Workers SET FIO = '${req.body.fio}', bd = '${req.body.bd}', phone = '${req.body.phone}', email = '${req.body.email}' , post = '${req.body.post}', salary = ${req.body.salary} WHERE worker_id = ${req.query.worker_id}`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});


// ------------------ WORKERS-EVENTS --------------------------------


app.delete("/event-worker", function(req, res){
    connection.query(
        `delete from Workers_events where event_id = ${req.query.event_id};`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});

// ------------------ WORKERS-PROJECTS --------------------------------

app.post('/worker-project', function(req, res){
    connection.query(
        `INSERT INTO Workers_projects(project_id, worker_id) VALUES (${req.body.project_id}, ${req.body.worker_id});`,
        function(err, results, fields) {
            res.send(err);
        }
    ); 
});




app.listen(3001, () => {
    console.log("Сервер запущен на 3001 порту");
});