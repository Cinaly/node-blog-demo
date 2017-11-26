/**
 * Created by web-01 on 2017/11/26.
 */
//引入模块
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const ejs=require('ejs');
const session=require('express-session');

let app = express();

//配置中间件
app.use(bodyparser.urlencoded({extended: true}));
app.engine('.html',ejs.__express);
app.set('view engine','html');
app.use(session({
    secret:'blog',
    resave:true,
    saveUninitialized:false
}));

app.use(express.static(path.join(__dirname,'/public')));


require('./routes/default')(app);
require('./routes/user')(app);
require('./routes/article')(app);

app.listen(80);