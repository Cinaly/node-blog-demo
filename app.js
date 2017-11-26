/**
 * Created by web-01 on 2017/11/26.
 */
//引入模块
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mysql = require('mysql');

let app = express();

//配置中间件
app.use(bodyparser.urlencoded({extended: true}));

//根目录路由
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/default.html'))
});

//创建数据库连接池
let pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    database: ''
});

//注册页链接路由
app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/sign-up.html'));
});

//注册请求的路由
app.post('/signUp', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);

    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = "select * from blog.user where username=?";
        connection.query(sql, [username], (err, results, fields) => {
            if (results.length === 1) {
                res.sendFile(path.join(__dirname, '/views/sign-up.html'));
            } else {
                sql = "insert into blog.user value(null,?,?)";
                connection.query(sql, [username, password], (err, results, fields) => {
                    if (err) throw err;
                    if (results.affectedRows === 1) {
                        res.sendFile(path.join(__dirname, '/views/sign-in.html'));
                    } else {
                        res.sendFile(path.join(__dirname, '/views/sign-up.html'));
                    }
                });
            }
        });
        connection.release();
    });


});

//配置登录路由
app.get("/sign-in", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/sign-in.html'));
});

//登录请求的路由
app.post("/signIn", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let sql = "select * from blog.user where username=? and password=?";
        connection.query(sql, [username, password], (err, results, fields) => {
            if (err) throw err;
            if (results.length === 1) {
                res.sendFile(path.join(__dirname, '/views/index.html'));
            } else {
                res.sendFile(path.join(__dirname, '/views/sign-in.html'));
            }
        });
        connection.release();
    });
});

app.listen(80);