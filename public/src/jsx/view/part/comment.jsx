var React = require('react');
var marked = require('marked');

var Comment = React.createClass({
	getInitialState: function() {
		return {
			data:[] 
		};
	},
	getDefaultProps: function() {
		return {
			id:null
		};
	},
	load:function(){
		var _this = this;
		$.get('/comment/'+this.props.id, function(data) {
		  	if(data.status == 1){
		  		_this.setState({
					data:data.data
				});
		  	}		
		});
	},

	onCommentCommit:function(data){
		var _this = this;
		data['article_id'] = this.props.id;
		$.post('/comment', data, function(data, textStatus, xhr) {
			if(data.status == 1){
				_this.load();
			}
		},"json");
	},

	componentDidMount: function() {
	  this.load();
	},

	render: function() {
		return (
			<div className="comment-box">
				<h3>Comment</h3>
				<hr />
				<List data={this.state.data} />
				<Form onCommentCommit={this.onCommentCommit}  />
			</div>
		);
	}	
});

var Form = React.createClass({
	getInitialState: function() {
		return {
			name:"",
			email:"",
			content:""
		};
	},
	handleSubmit:function(e){
		e.preventDefault();		
		this.props.onCommentCommit(this.state);
		var param = {
			name:"",
			email:"",
			content:""
		};
		this.setState(param);
		return ;
	},
	handleChange:function(e){
		var name = e.target.name;
		var value = e.target.value;
		var data = {};
		data[name] = value;
		this.setState(data);
	},
	render: function() {
		return (
			<form id="comment-post" onSubmit={this.handleSubmit} >
				<input name="name" value={this.state.name} onChange={this.handleChange} placeholder="请输入您的名称" className="form-control" require="true" type="text" />
				<input name="email" value={this.state.email} onChange={this.handleChange} placeholder="请输入您的邮箱" className="form-control"  type="email" />
				<textarea name="content" value={this.state.content} onChange={this.handleChange} placeholder="请输入内容" className="form-control" />				<input type="submit" className="btn btn-default" />
			</form>
		);
	}
})

var List = React.createClass({
	getDefaultProps: function() {
		return {
			data:[]
		};
	},
	render: function() {
		var comments = this.props.data.map(function(val){
			return (
				<Item data ={val} />
			);
		});
		return (
			<div className="comment-list">
				{comments}
			</div>
		);
	}
});

var Item = React.createClass({
	getDefaultProps: function() {
		return {
			data:null
		};
	},
	rawMarkup:function(){
		var content = this.props.data.content;
		var rawMarkup = marked(content,{sanitize:true});
		return {__html: rawMarkup};
	},
	render: function() {
		var dataset = this.props.data;
		return (
			<div className="comment">
				<strong className="author">
					{dataset.name}
					<time>{moment((dataset.create_time*1000)).fromNow()}</time>
				</strong>
				<div dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

module.exports = Comment;