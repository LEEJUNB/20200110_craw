const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // docs를 찾을때 public에서 찾음

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
        i = i+i;
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
})

app.listen(3000, function(){
    console.log(`Connected ${port}`);
});