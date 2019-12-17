const express_id = require('express'); // require함수가 리턴한 값(express)을 express_id라는 변수에 담았다. 이 변수로 express모듈 제어가능
const app = express_id(); // express모듈을 가져왔으면 app객체를 만든다. express_id변수에 담긴 함수를 호출, 실행하면 app변수, 객체를 리턴
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'pug');

app.get('/topic/new', function(req,res){
    res.render('new');
});

app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(`new POst!! ${title} ${description}`);
})

app.listen(4000, function(){ //app객체가 가진 메소드 중 listen을 통해 특정 port를 listen하도록 만든다.
    console.log('Connected, 3000 port!');
})