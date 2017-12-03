/**
 * Created by web-01 on 2017/12/3.
 */
const db=require('../lib/db');

module.exports=function (app) {
    app.get('/blog/:username', (req, res) => {
        let sql='select p.*,u.uid,uname,avatar ' +
            'from blog.post p right outer join blog.user u ' +
            'on p.uid=u.uid where u.uid=? order by addtime desc';
        db.pool.query(sql,[req.session.userId],(err,results,fields)=>{
            if(err) throw err;
            res.render('blog',{
                session:req.session,
                posts:results
            })
            console.log(results);
        });

     //   console.log(`username:${req.session.username}`);
     //   res.render('blog', {session: req.session});
    })
}