/**
 * Created by web-01 on 2017/12/3.
 */
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
const flash=require('connect-flash');
const upload=require('express-fileupload');

let app=express();

app.engine('html',ejs.__express);
app.set('view engine','.html');
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'node blog',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use(upload());

//require
require('./routes/index.js')(app);
require('./routes/user.js')(app);
require('./routes/blog.js')(app);
require('./routes/post.js')(app);

app.listen(80);