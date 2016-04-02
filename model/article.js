
var mysql = require('../helper/mysql');

function query(q,page,pagesize,sort,callback){
	q = q || null;
	sort = sort || "create_time";
	page = page || 0;
	pageSize = pagesize || 12;
	var offset = parseInt(page) * pageSize;
	callback = callback || null;
	
	var sql = "SELECT id,title,create_time FROM `article` WHERE `is_delete` = ? ORDER BY `{2}` DESC LIMIT {0},{1}".format(offset,pageSize,sort);
	if(q){
		sql = "SELECT id,title,create_time FROM `article` WHERE `is_delete` = ? AND `title` LIKE ? ORDER BY `{2}` DESC LIMIT {0},{1}".format(offset,pageSize,sort);
	}

	var query = mysql.query({
				  sql: sql,
				  timeout: 5000,
				  values: [0]
				},callback);
	console.log(query.sql);
}
exports.query = query;

function find(id,callback){
	callback = callback || null;
	var query = mysql.query({
				  sql: "SELECT * FROM `article` WHERE `id` = ?",
				  timeout: 5000,
				  values: [id]
				},callback);
	mysql.query("UPDATE `article` SET `view_count` = `view_count` + 1 WHERE id=?",id);
}
exports.find = find;

function create(title,content,callback){
	var data = {
		title:title,
		content:content,
		create_time:Date.now()/1000,
		type:1,
		status:1,
		is_delete:0
	};
	callback = callback || null;
	var query = mysql.query("INSERT INTO article SET ?",data,callback);
	console.log(query.sql);
}

exports.create = create;

function comment(article_id,name,email,content,callback){
	var data = {
		article_id:article_id,
		content:content,
		create_time:Date.now()/1000,
		name:name,
		email:email,
		status:1
	};
	callback = callback || null;
	var query = mysql.query("INSERT INTO `comment` SET ?",data,callback);
}
exports.comment = comment;

function loadComment(id,page,callback){
	page = page || 0; 
	var pageSize = 12;
	var offset = parseInt(page) * pageSize;
	callback = callback || null;
	var query = mysql.query({
				  sql: "SELECT create_time,name,email,content FROM `comment` WHERE `article_id` = ? ORDER BY `create_time` DESC LIMIT {0},{1}".format(offset,pageSize),
				  timeout: 5000,
				  values: [id]
				},callback);
	console.log(query.sql);
}
exports.loadComment = loadComment;


function remove(id,callback){
	var data = {
		is_delete:0
	};
	callback = callback || null;
	var query = mysql.query("UPDATE article SET ?",data,callback);
	console.log(query.sql);
}
exports.remove = remove;
