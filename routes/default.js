/**
 * Created by web-01 on 2017/11/26.
 */

module.exports=function (app) {
    //根目录路由
    app.get("/", (req, res) => {
       // res.sendFile(path.join(__dirname, '/views/default.html'))
        res.render('default',{});
    });

//注册页链接路由
    app.get("/sign-up", (req, res) => {
        //res.sendFile(path.join(__dirname, '/views/sign-up.html'));
        res.render('sign-up',{message:null});
    });

//配置登录路由
    app.get("/sign-in", (req, res) => {
        //res.sendFile(path.join(__dirname, '/views/sign-in.html'));
        res.render('sign-in',{message:null});
    });
}
