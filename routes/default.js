var express = require('express');
var router = express.Router();
var _ = require("lodash");

var Article = require('../models/article.js');
var Comment = require('../models/comment.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Seala'});
});

router.get('/list', function(req, res, next) {	
	var page = parseInt(req.query.page) || 0;
	var pagesize = parseInt(req.query.pagesize) || 15;	
	var sort = null;
	var allowSort = ['comment_count','view_count','favorite_count'];	
	if(req.query.hasOwnProperty("sort") && (_.indexOf(allowSort,req.query.sort) != -1)){
		sort = req.query.sort;
	}else{
		sort =  "create_at";
	}
	var map = {};
	map['is_delete'] = 0;
	var q = req.query.query || "";
	if(q){
		map['title'] ={$like:"%"+q+"%"}
	}
	Article.findAll({
		attributes:['id','title','create_at'],
		where:map,
		offset:page * pagesize,
		limit: pagesize,
		order:sort + " DESC"
	}).then(function(data){		
		if(data){
			res.send({status:1,data:data});
		}else{
			res.send({status:0,data:null});
		}
	});
});

router.get('/view/:id', function(req, res, next) {
	var id = req.params.id;
	Article.findOne({
		where:{id:id}
	}).then(function(data){
		if(data){
			res.send({status:1,data:data.dataValues});
		}else{
			res.send({status:0,data:null});
		}
	});
});

router.get('/comment/:id', function(req, res, next) {
	var id = req.params.id;	
	Comment.findAll({
		where:{article_id:id},
		attributes:['create_at','name','email','content'],
		order:'create_at DESC'
	}).then(function(data){
		if(data){
			res.send({status:1,data:data});
		}else{
			res.send({status:1,data:null});
		}
	});	
});

router.post('/post', function(req, res, next) {
	var data = req.body;
	var allowField = ['title','content'];
	_.map(data,function(val,key){
		if(_.indexOf(allowField,key) == -1){
			_.unset(data,key);
		}
	});
	Article.create(data)
	.then(function(article){
		if(article){
			res.send({status:1,data:null})
		}else{
			res.send({status:0,data:null})
		}
	})	
});

router.post('/comment', function(req, res, next) {
	var data = req.body;
	var allowField = ['name','email','content','article_id'];
	_.map(data,function(val,key){
		if(_.indexOf(allowField,key) == -1){
			_.unset(data,key);
		}
	});
	Comment.create(data)
	.then(function(data){
		if(data){
			res.send({status:1,data:null})
		}else{
			res.send({status:0,data:null})
		}
	})	
});

module.exports = router;
