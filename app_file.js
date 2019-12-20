const express_id = require('express'); // require함수가 리턴한 값(express)을 express_id라는 변수에 담았다. 이 변수로 express모듈 제어가능
const app = express_id(); // express모듈을 가져왔으면 app객체를 만든다. express_id변수에 담긴 함수를 호출, 실행하면 app변수, 객체를 리턴
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'pug');

app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    })
});

// form에 입력한 값들이 파일로 저장되도록 fs모듈을 이용하자
app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    //data라는 폴더에 형성된다.
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error'); // 500 is error number
        }
        res.redirect('/topic' + title); // 작성한 글에 대한 페이지로 이동
    })
});

// 사용자가 url을 통해 들어올 수 있도록 get도 만들자.
// 글 목록이 화면에 표시된다.
app.get(['/topic', '/topic/:id'], function(req,res){
    fs.readdir('data', function(err,files){ // files인자 안에는 data라는 디렉터리안에 포함된 파일들이 배열로 담김
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id ,'utf8', function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            })
        } else {
            res.render('view', {topics:files, title:'Welcome', description:'Hello Man'}); // view is filename, topics(변수)를 통해 files인자(파일들을 배열화시킨 것)를 가져온다.
        }
    })
}); 



app.listen(3000, function(){ //app객체가 가진 메소드 중 listen을 통해 특정 port를 listen하도록 만든다.
    console.log('Connected, 3000 port!');
})