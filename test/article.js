var Article = require("../models/article.js");
var Comment = require("../models/comment.js");
var Tag = require("../models/tag.js");
var TagLink = require("../models/tagLink.js");



Article.create({
	title:"test",
	content:"haha"
}).then(function(article){
	return data.update({
		title:"22"
	});
}).then(function(data){
	console.log(data);
})

