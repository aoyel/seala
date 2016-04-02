var _ = require("lodash");
var mysql = require('mysql');
var config = require('../config/config');

function model(table){
	this._table = table;
	this._fields = "*";
	this._map = null;
	this._condition = "";
	this._values = [];
	this._join = [];
	this._order = [];
	this._sql = "";
	this._query = null;
	this.init();
}

model.prototype.init = function() {
	this.connection = mysql.createConnection(config.database);
	this.connection.connect(function(err) {
	  if (err) {
	    console.log(err);
	    process.exit(1);
	  }
	});
};

model.prototype.reset = function() {
	this._fields = "*";
	this._map = null;
	this._condition = "";
	this._values = [];
	this._join = [];
	this._order = [];
	this._sql = "";
};

model.prototype.fields = function(fields) {
	this._fields = fields || "*";
};

model.prototype.where = function(map) {
	this._map = map;
	return this;
};

model.prototype.comparison = function(k){
	var map = {
		'eq': '=',
		'neq' : '<>',
		'gt' : '>',
		'egt' : '>=',
		'lt' : '<',
		'elt' : '<=',
		'notlike' : 'NOT LIKE',
		'like' : 'LIKE'
	};
	if(map.hasOwnProperty(k)){
		return map[k];
	}
	return null;
}

model.prototype.buildWhere = function() {
	var _this = this;
	if(_.isString(this._map)){
		_this._sql += " WHERE " + _this._map;
	}else{
		var map = _this._map;	
		_.map(map,function(val,key){							
			if(_.isArray(val)){
				if(val.length >= 2){
					var o = _this.comparison(val[0]);
					if(!_.isNull(o)){
						_this._condition += " `" + key + "` " + o + " ? AND";						
						_this._values.push(val[1]);
					}	
				}							
			}else{
				_this._condition += " `" + key + "` = ? AND";
				_this._values.push(val);
			}
		})		
		if(_this._condition !== ""){			
			_this._sql += " WHERE" + _.trimEnd(_this._condition,"AND");
		}		
	}	
};

model.prototype.join = function(table,condition,type) {
	if(_.isUndefined(table)){
		return this;
	}
	var allowType = ['LEFT', 'RIGHT', 'OUTER', 'INNER', 'LEFT OUTER', 'RIGHT OUTER'];
	type = _.toUpper(_.trim(type));
	if(_.indexOf(allowType,type) == -1){
		type == "INNER"
	}
	this._join.push([type,table,condition]);
	return this;
};

model.prototype.buildJoin = function() {
	var str = "";
	if(_.isArray(this._join) && this._join.length > 0){
		for(var i=0,len = this._join.length ; i< length ;i++){
			var d = this._join[i];
			str += d[0] + " JOIN " + d[1] +" ON " + d[2] + " ";
		}
	}
	if(str != ""){
		this._sql += str;
	}
};

model.prototype.order = function(field,direction) {
	var allowedDirection = ['ASC', 'DESC'];
	if(_.isNull(field)){
		return this;
	}
	if(_.isNull(direction) || (_.indexOf(allowedDirection,direction) == -1)){
		direction = allowedDirection[0];
	}
	this._order.push([field,direction]);
	return this;
};

model.prototype.buildOrder = function() {
	var str = "";
	if(_.isArray(this._order) && this._order.length > 0){
		for(var i=0,len = this._order.length ; i< len ;i++){
			var d = this._order[i];
			str += d[0] + " " + d[1] +",";
		}
	}
	if(str != ""){
		this._sql += " ORDER BY " + _.trimEnd(str,",");
	}
};

model.prototype.limit = function(offset,limit) {
	if(_.isUndefined(limit)){
		limit = offset;
		offset = 0;
	}
	this._limit = " LIMIT " + offset + "," + limit;
	return this;
};

model.prototype.buildLimit = function() {
	this._sql += this._limit;	
};

model.prototype.getInstence = function() {
	return this.connection;
};

model.prototype.insert = function(columns,callback) {
	this._query = this.connection.query("INSERT INTO " + this._table + " SET ?",columns,callback);
};

model.prototype.update = function(columns,callback) {
	var _this = this;
	_this._sql = "UPDATE `" + this._table + "`";
	var str = "";
	_.map(columns,function(val,key){
		str += "`" + key + "` = " + _this.connection.escape(val) + ",";
	})
	if(str != "")
		str = " SET " + _.trimEnd(str,",");
	this._sql += str;
	this.buildWhere();
	this._query = this.connection.query(this._sql,this._values,callback);
	this.reset();
};

model.prototype.delete = function(callback) {
	this._sql = "DELETE FROM `" + this._table + "`";
	this.buildWhere();	
	this._query = this.connection.query(this._sql,this._values,callback);	
	this.reset();
};

model.prototype.execute = function(sql,callback) {
	this._query = this.connection.query(sql,callback);
	this.reset();
};

model.prototype.prepare = function(){
	this._sql = "SELECT " + this._fields + " FROM `" + this._table + "`";
	this.buildJoin();
	this.buildWhere();
	this.buildOrder();
	this.buildLimit();
}

model.prototype.get = function(callback) {
	this.limit(1);
	this.prepare();	
	this._query = this.connection.query(this._sql,
										this._values,
										function(err,data){
											if(_.isArray(data)){
												data = data[0];
											}
											callback && callback(err,data);
	});
	this.reset();
};

model.prototype.find = function(callback) {
	this.prepare();	
	this._query = this.connection.query(this._sql,this._values,callback);	
	this.reset();
};

/**
 * [getModel description]
 * @param  {[type]} table [description]
 * @return {[type]}       [description]
 */
function getModel(table){
	return new model(table);
}

module.exports = getModel;