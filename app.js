/**
 * Created by wilfred.arambhan on 05/01/19.
 */
var Express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var urlEncodedParser = bodyParser.urlencoded({extended: false});
var app = Express();

app.use(session({secret: 'wilfred'}));

app.use(function (req, res, next) {

    if(typeof (req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});


app.get('/todo', function (req, res) {
   res.render('todo.ejs', {todolist: req.session.todolist});
});

app.post('/todo/add', urlEncodedParser, function (req, res) {
    if(req.body.todo != '') {
        req.session.todolist.push(req.body.todo);
    }
    res.redirect('/todo');

    //res.render('add.ejs');
});

app.get('/todo/delete/:id', function (req, res) {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
    //res.render('delete.ejs');
});

app.use(function (req, res, next) {
    res.redirect('/todo');
});

app.listen(8080);