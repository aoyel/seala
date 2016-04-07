var model = require("./model.js");
var Sequelize = model.Sequelize;

var Comment = model.sequelize.define("comment",{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement:true,
		primaryKey:true		
	},
	name:{
		type: Sequelize.STRING(20),
		allowNull:false
	},
	article_id:{
		type: Sequelize.INTEGER,
		allowNull:false
	},
	email:{
		type: Sequelize.STRING(56),
		allowNull:true,
		validate:{
			isEmail:true
		}
	},	
	create_at:{
		type:Sequelize.DATE,
		defaultValue:Sequelize.NOW
	},
	content:{
		type: Sequelize.STRING(526),
		defaultValue:0
	},
	status:{
		type: Sequelize.INTEGER(1),
		defaultValue:1
	}
},{
	timestamps:false
});

Comment.sync({force: false});
module.exports = Comment;