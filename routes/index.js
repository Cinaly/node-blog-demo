/**
 * Created by web-01 on 2017/12/3.
 */


module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('index', {session: req.session});
    })

    app.get('/sign-up', (req, res) => {
        res.render('sign-up', {session: req.session, success: req.flash('success'), error: req.flash('error')});
    })

    app.get('/sign-in', (req, res) => {
        res.render('sign-in', {session: req.session, success: req.flash('success'), error: req.flash('error')});
    })

    app.get('/sign-out', (req, res) => {
        req.session.destroy();
        res.redirect('/')
    })




}