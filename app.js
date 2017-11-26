/**
 * Created by web-01 on 2017/11/26.
 */
//引入模块
const express = require('express');
//const path = require('path');
const bodyparser = require('body-parser');


const ejs=require('ejs');

//console.log(ejs.render('hello,<%= name%>',{name:'EJS'}));
let app = express();

//配置中间件
app.use(bodyparser.urlencoded({extended: true}));
app.engine('.html',ejs.__express);
app.set('view engine','html');


require('./routes/default')(app);
require('./routes/user')(app);

app.listen(80);