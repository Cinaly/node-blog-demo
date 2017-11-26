/**
 * Created by web-01 on 2017/11/26.
 */

//处理跟user有关的所有请求
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

//创建数据库连接池
let pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    database: ''
});
module.exports = function (app) {

    //注册请求的路由
    app.post('/signUp', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let salt = bcrypt.genSaltSync(10); //随机盐
        let encryptedPassword = bcrypt.hashSync(password, salt);
        pool.getConnection((err, connection) => {
            if (err) throw err;
            let sql = "select * from blog.user where username=?";
            connection.query(sql, [username], (err, results, fields) => {
                if (results.length === 1) {
                    //res.sendFile(path.join(__dirname, '/views/sign-up.html'));
                    res.render('sign-up', {message: '用户名已存在'});
                } else {
                    sql = "insert into blog.user value(null,?,?)";
                    connection.query(sql, [username, encryptedPassword], (err, results, fields) => {
                        if (err) throw err;
                        if (results.affectedRows === 1) {
                            // res.sendFile(path.join(__dirname, '/views/sign-in.html'));
                            res.render('sign-in', {message: "注册成功,请登录"});
                        } else {
                            // res.sendFile(path.join(__dirname, '/views/sign-up.html'));
                            res.render('sign-in', {message: "注册失败"});
                        }
                    });
                }
            });
            connection.release();
        });


    });

    //登录请求的路由
    app.post("/signIn", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            let sql = "select * from blog.user where username=?";
            connection.query(sql, [username, password], (err, results, fields) => {
                if (err) throw err;
                if (results.length === 1) {
                    let encryptedPassword = results[0].password;
                    console.log(encryptedPassword);
                    if (bcrypt.compareSync(password, encryptedPassword)) {

                        //res.sendFile(path.join(__dirname, '/views/index.html'));
                        req.session.username=results[0].username;
                        req.session.userId=results[0].uid;
                        res.redirect('/article/list');
                        //res.render('index', {session:req.session,message:null});
                    } else {
                        // res.sendFile(path.join(__dirname, '/views/sign-in.html'));
                        res.render('sign-in', {message: "用户名或密码错误"});
                    }
                } else {
                    //res.sendFile(path.join(__dirname, '/views/sign-in.html'));
                    res.render('sign-in', {message: "用户名或密码错误"});
                }
            });
            connection.release();
        });
    });

    //注销
    app.get("/logout",(req,res)=>{
        console.log(req.session);
        req.session.destroy();
        console.log(req.session);
        res.redirect('/'); //重定向到default页面,app.get('/',...)
    });
}
