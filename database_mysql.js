var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});

conn.connect();

/*
const sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    for(var i = 0; i<rows.length; i++){
      console.log(rows[i].author);
    }
  }
})
*/

/*
var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
var params = ['Super', 'watcherDesc', 'graphauthor'];
conn.query(sql.params,function(err,rows,fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows.insertId);
  }
});
*/

/* Update
const sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['NPM', 'JBE', 1];
conn.query(sql,params,function(err,rows,fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});
 */

/* Delete */
const sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
conn.query(sql,params,function(err,rows,fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});

conn.end();