/**
 * Created by web-01 on 2017/12/3.
 */
const bcrypt=require('bcryptjs');
const path=require('path');
const db=require('../lib/db');
const avatarFileTypes=/(png|jpg|gif|svg)/i;


module.exports=function (app) {
    app.post('/signUp',(req,res)=>{
        let username=req.body.username;
        let password=req.body.password;
        let encryptedPassword=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
        let avatar=req.files.avatar;
        let fileName='default.svg';
        if(avatar){
            let extName=path.extname(avatar.name);
            if(!avatarFileTypes.test(extName)){
                req.flash('error','头像文件非法,请重新上传')
                return res.redirect('back');
            }
            fileName=Date.now()+extName;
            // console.log(fileName);
            avatar.mv(path.join(__dirname,'../public/avatars/'+fileName));
        }
        let sql='select * from blog.user where uname=?';
        db.pool.query(sql,[username],(err,results,fields)=>{
            if(err) throw err;
            if(results.length===1){
                req.flash('error','用户名已存在.')
                return  res.redirect('back');
                 //res.render('sign-up',{message:'用户名已存在.'});
                // res.end();
            }else{
                sql='insert into blog.user(uname,upwd,avatar) value(?,?,?)';
                db.pool.query(sql,[username,encryptedPassword,fileName],(err,results,fields)=>{
                    if(err) throw err;
                    if(results.affectedRows===1){
                       req.flash('success','注册成功,请登录!');
                       res.redirect('/sign-in');
                       // res.render('sign-in',{message:'注册成功,请登录!'});
                       // res.end();
                    }else{
                        req.flash('error','注册失败');
                        res.redirect('back')
                    }
                   // res.render('sign-up',{message:'注册失败.'});
                })
            }
        })
    })

    app.post('/signIn',(req,res)=>{
        let username=req.body.username;
        let password=req.body.password;

        let sql='select * from blog.user where uname=?';
        db.pool.query(sql,[username],(err,results,fields)=>{
            if(err) throw err;
            if(results.length===1){
                let enctyptPassword=results[0].upwd;
                if(bcrypt.compareSync(password,enctyptPassword)){
                    req.session.username=results[0].uname;
                    req.session.userId=results[0].uid;
                    req.session.avatar=results[0].avatar;
                    res.redirect('/blog/'+username);
                }else {
                    req.flash('error','非法的用户名或密码');
                    res.redirect('back');
                }
            }else{
                req.flash('error','非法的用户名或密码');
                res.redirect('back');
            }
        })
    })
};