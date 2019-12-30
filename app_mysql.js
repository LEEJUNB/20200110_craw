///// testing
const express_id = require('express'); // require함수가 리턴한 값(express)을 express_id라는 변수에 담았다. 이 변수로 express모듈 제어가능
const app = express_id(); // express모듈을 가져왔으면 app객체를 만든다. express_id변수에 담긴 함수를 호출, 실행하면 app변수, 객체를 리턴
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const _storage = multer.diskStorage({
    destination: function(req,file,cb){ // cb는 callback으로 함수가 실행됐을 시 적당한 디렉터리, 파일이 저장될 수 있게함
        cb(null, 'uploads/') // 파일저장경로
    },
    filename : function(req,file,cb){
        cb(null, file.originalname); // 파일제목지정
    }
})

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});

conn.connect();

const upload = multer({storage:_storage})
app.use('/user', express_id.static('uploads')); // user라는 디렉터리를 통해 사용자들이 uploads폴더에서 파일을 가져가도록 만듦

app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;

app.set('views', './views_mysql'); // 템플릿파일을 찾을 때, views_mysql파일을 찾음
app.set('view engine', 'pug');

app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Intervar Server Error')
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
        res.send('Success!' + req.body.title);
    })
});

// 사용자가 url을 통해 들어올 수 있도록 get도 만들자.
// 글 목록이 화면에 표시된다.
app.get(['/topic', '/topic/:id'], function(req,res){
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err,topics,fields){
        res.render('view', {topics:topics});
    });
    /*
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
    */
}); 

app.get('/upload', function(req,res){
    res.render('upload');
});

// single의 인자는 해당 input타입의 name명이다.
// 그리고 이 인자의 단수 파일을 전달받아 req.file에 저장된다.
app.post('/upload', upload.single('userfile'), function(req,res){
    console.log(req.file);
    res.send('uploaded : ' + req.file.filename); // filename을 통해 전송된 파일의 이름을 알 수 있음
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(3000, function(){ //app객체가 가진 메소드 중 listen을 통해 특정 port를 listen하도록 만든다.
    console.log('Connected, 3000 port!');
})