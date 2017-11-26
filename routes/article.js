/**
 * Created by web-01 on 2017/11/26.
 */

const mysql=require('mysql');
let pool=mysql.createPool({
    user:'root'
});

module.exports=function (app) {
    app.post('/article/create',(req,res)=>{
        let title=req.body.title;
        let content=req.body.content;
        let photo=null;
        let userId=req.session.userId;
        let sql="insert into blog.article(title,content,photo,uid) value(?,?,?,?)";
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            conn.query(sql,[title,content,photo,userId],(err,results,fields)=>{
                if(err) throw err;
                if(results.affectedRows==1){
                   // res.render('index',{session:req.session,message:'success'})
                    res.redirect('/article/list');
                }else{
                    res.render('index',{message:'failed'})
                }
            });
        })
    });

    app.get('/article/list',(req,res)=>{
        let userId=req.session.userId;
        let sql="select * from blog.article where uid=?";
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            conn.query(sql,[userId],(err,results,fields)=>{
                if(err) throw err;
                res.render('index',{session:req.session,articles:results,message:null})
            })
        })

    });

}