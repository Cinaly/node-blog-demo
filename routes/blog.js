/**
 * Created by web-01 on 2017/12/3.
 */
module.exports=function (app) {
    app.get('/blog/:username', (req, res) => {
        console.log(`username:${req.session.username}`);
        res.render('blog', {session: req.session});
    })
}