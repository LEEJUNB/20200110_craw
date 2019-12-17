const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views','./views'); // folder name is 'views', directory position is './views'

//그럼 public폴더안에 있는 파일은 render할때 못부르는건가?
app.use(express.static('public')); // docs를 찾을때 public에서 찾음
// public폴더안에 있는 파일들은 단순히 url로 호출할 때 사용한다
// localhost:3000/public/
// 단순히 저장된 파일을 불러올 때 사용한다

app.get('/template', function(req,res){ // render될 파일은 ./views폴더에 있다.
    res.render('temp', {variableMan:'Var', Time:Date(), _title:'Pug Page'}); // file name is 'temp'
})

app.get('/topic/:id', function(req,res){
    var topics = [
        'What it is?',
        'Our Goal',
        'Benefits'
    ];

    var output = `
    <a href="/topics?id=0"> What? </a><br>
    <a href="/topics?id=1"> Goal? </a><br>
    <a href="/topics?id=2"> Benefits? </a><br>
    ${topics[req.params.id]}
    `
    res.send(output);
})

app.get('/', function(req,res){
    res.send('Hello home');
});

app.get('/login', function(req,res){
    res.send('<h1>login please</h1> <img src="/war.jpg">'); // 상대경로의 기준이 public폴더임
});

app.get('/dynamic', function(req,res){
    var lis = '';
    var book = '';
    for(var i=0; i < 5; i++){
        lis = lis + '<li>start</li>';
        book = book + '<li>bookman</li>';
    }

    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>dynamic</title>
        </head>
        <body>
            dynamic dfdf Heddfllo Hello!!
            ${lis}
            ${book}
            ${i}
            
        </body>
    </html>
    `
    res.send(output);
});

app.get('/form', function(req,res){
    res.render('form');
});

app.post('/form_receiver', function(req,res){
    res.send('Hello, POST');
})


app.listen(3000, function(){
    console.log(`Connected ${port}`);
});