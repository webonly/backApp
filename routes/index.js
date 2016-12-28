var express = require('express');
var router = express.Router();

module.exports = router;


  // res.send(req.body);
  //  res.send(req.body.product);

  /* ----------------------------my app start -------------------------------- */
// router.all('*', function(req, res, next) {
//     res.header(200, { "Content-Type": "text/html;charset=utf-8" });      //设置响应头属性值
//     next();
// });


var sqlite3 = require('sqlite3').verbose();
/* 查询用户表 */
router.post('/user', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    db.all('SELECT * from user', function(err, row) {
     	res.json(row);
  		});
    });  
	db.close();
});

/* 增加用户表 */
router.post('/user/add/', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    var stmt = db.prepare("insert into user (username,password) values(?,?)",function(err){
         if (err) { res.json(err); }else{ res.json({"errno":0});}
    });
        stmt.run(req.body.username,req.body.password);
        stmt.finalize();
    });  
	db.close();
});

/* 查询配置表 */
router.post('/setting', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    db.all('SELECT * from setting', function(err, row) {
     	res.json(row);
  		});
    });  
	db.close();
});

/* 增加数据 */
router.post('/setting/add', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    var stmt = db.prepare("insert into setting (data) values(?)",function(err){
         if (err) { res.json(err); }else{ res.json({"errno":0});}
    });
        stmt.run(req.body.data);
        stmt.finalize();
    });  
	db.close();
});
/* 删除数据 */
router.post('/setting/delete', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    var stmt = db.prepare("delete from setting where id=?",function(err){
         if (err) { res.json(err); }else{ res.json({"errno":0});}
    });
        stmt.run(req.body.id);
        stmt.finalize();
    });  
	db.close();
});
/* 修改数据 */
router.post('/setting/modify', function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	var db = new sqlite3.Database(__dirname+'/sqlite/welldb.db');
 	db.serialize(function() {
    var stmt = db.prepare("update setting set data=? where id=?",function(err){
         if (err) { res.json(err); }else{ res.json({"errno":0});}
    });
        stmt.run(req.body.data,req.body.id);
        stmt.finalize();
    });  
	db.close();
});






















/* 404 错误 */
router.get('*', function(req, res, next) {
    res.send("404 error!");
});