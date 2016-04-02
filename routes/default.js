var express = require('express');
var router = express.Router();
var article = require('../model/article');
var _ = require("lodash");
var model = require('../model/model.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Seala'});
});


router.get('/post', function(req, res, next) {
  	res.render('post', { title: 'post'});
});

router.post('/post', function(req, res, next) {
  	article.create(req.body.title,req.body.content,function(err,results){
  		console.log(results);
  		if(err){  			
			res.send({
		  		status:0,
		  		data:err.code
		  	});
  		}else{
  			res.send({
		  		status:1,
		  		data:results.insertId
		  	});
  		}
  	})
});

router.get('/list', function(req, res, next) {	
	var page = req.query.page || 0;
	var pagesize = req.query.pagesize || 15;	
	var sort = null;
	var allowSort = ['create_time','comment_count','view_count','like_count'];
	var orderway = "DESC";
	if(req.query.hasOwnProperty("sort") && (_.indexOf(allowSort,req.query.sort) != -1)){
		sort = req.query.sort;
	}else{
		sort = "create_time";
	}
	var map = {};
	var q = req.query.query || "";
	if(q){
		map['title'] = ["like","%" + q + "%"];
	}
	model("article").where(map).order(sort,orderway).limit(page*pagesize,pagesize).find(function(err,data){		
		if(err){
			res.send({});
		}else{
			res.send(data);
		}
	});
});

router.post('/comment', function(req, res, next) {
	var data = req.body;
  	article.comment(data.article_id,data.name,data.email,data.content,function(err,results){
  		if(err){ 
  			console.log(err);	
			res.send({
		  		status:0,
		  		data:err.code
		  	});
  		}else{
  			res.send({
		  		status:1,
		  		data:null
		  	});
  		}
  	})
});

router.get('/view/:id', function(req, res, next) {
	var id = req.params.id;
	article.find(id,function(err,results,fields){
		var data = results[0];		
		res.send(data);		
	})  	
});

router.get('/comment/:id', function(req, res, next) {
	var id = req.params.id;
	article.loadComment(id,0,function(err,results,fields){
		if(err){
			res.send({
				status:0,
				data:null
			});
		}else{			
			res.send({
				status:1,
				data:results
			});
		}		
	})  	
});


module.exports = router;
