/**
 * Created by web-01 on 2017/12/3.
 */

const db = require('../lib/db');

module.exports = function (app) {
    app.get('/post', (req, res) => {
        res.render('post', {
                session: req.session,
                success: req.flash('success'),
                error: req.flash('error')
            }
        )
    })

    app.post('/post/create', (req, res) => {
        let title = req.body.title;
        let content = req.body.content;
        let uid = req.session.userId;
        let sql = 'insert into blog.post(title,content,uid) value(?,?,?)';
        db.pool.query(sql, [title, content, uid], (err, results, fields) => {
            if (err) throw err;
            if (results.affectedRows === 1) {
                res.redirect('/blog/' + req.session.username);

            } else {
                res.flash('error', '发布失败!');
                res.redirect('back');
            }
        });
    })

    app.get('/post/:pid', (req, res) => {
        let pid = req.params.pid;
        console.log(pid);
        let sql = 'select p.*,u.uid,uname,avatar ' +
            'from blog.post p right outer join blog.user u ' +
            'on p.uid=u.uid where pid=?';
        db.pool.query(sql, [pid], (err,results,fields) => {
            if(err) throw err;
            res.render('entry',{
                session:req.session,
                post:results[0]
            })
        })
    })
}