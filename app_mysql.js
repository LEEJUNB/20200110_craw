const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const _storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename : function(req,file,cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage : _storage})
const fs = require('fs');
const app = express();
