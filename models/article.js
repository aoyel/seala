var model = require("./model.js");
var Sequelize = model.Sequelize;

var Article = model.sequelize.define("article",{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement:true,
		primaryKey:true	
	},
	title:{
		type: Sequelize.STRING(80),
		allowNull:false
	},
	create_at:{
		type:Sequelize.DATE,
		defaultValue:Sequelize.NOW
	},
	description:{
		type: Sequelize.STRING(255),
		allowNull:true
	},
	view_count:{
		type: Sequelize.INTEGER,
		defaultValue:0
	},
	comment_count:{
		type: Sequelize.INTEGER,
		defaultValue:0
	},
	favorite_count:{
		type: Sequelize.INTEGER,
		defaultValue:0
	},
	content:{
		type: Sequelize.TEXT,
		allowNull:true
	},
	status:{
		type: Sequelize.INTEGER(1),
		defaultValue:1
	},
	is_delete:{
		type: Sequelize.INTEGER,
		defaultValue:0
	}
},{
	timestamps:false
});

Article.sync({force: false});
module.exports = Article;