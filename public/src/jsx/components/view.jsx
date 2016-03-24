var React = require('react');
var marked = require('marked');
var SideBar = require('./sidebar.jsx');

var CommentContainer = React.createClass({
	getInitialState: function() {
		return {
			data:[] 
		};
	},

	reload:function(){
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
				_this.reload();
			}
		},"json");
	},
	componentDidMount: function() {
	  this.reload();
	},
	render: function() {
		return (
			<div className="comment-box">
				<h3>Comment</h3>
				<hr/>
				<CommentList data={this.state.data} />
				<CommentForm onCommentCommit={this.onCommentCommit}  />
			</div>
		);
	}	
});


var CommentForm = React.createClass({
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

var CommentList = React.createClass({
	getDefaultProps: function() {
		return {
			data:[]
		};
	},
	render: function() {
		var comments = this.props.data.map(function(val){
			return (
				<Comment data ={val} />
			);
		});
		return (
			<div className="comment-list">
				{comments}
			</div>
		);
	}
});

var Comment = React.createClass({
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



var View = React.createClass({
	rawMarkup:function(){
		var content = this.props.data.content;
		var rawMarkup = marked(content,{sanitize:true});
		return {__html: rawMarkup};
	},
	render: function() {
		var data = this.props.data;
		return (
			<div className="article-view">
				<h2>{data.title}</h2>				
				<div className="tool-box">
					<span><i className="icon-clock"></i>{moment((data.create_time*1000)).fromNow()}</span>
					<span><i className="icon-eye"></i>{data.view_count}</span>
				</div>
				<article className="markdown" dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

var Loadding = React.createClass({
	render: function() {
		return (
			<div >loadding ...</div>
		);
	}
});

var ViewContainer = React.createClass({
	getInitialState: function() {
		return {
			isLoad:false,
			data:null
		};
	},
	componentDidMount: function() {
		var _this = this;

		const id = this.props.id;
		$.get('/view/'+id,function(data) {
			_this.setState({
				isLoad:true,
				data:data
			});
		});
	},
	render: function() {
		if (this.state.isLoad) {
			return (
					<div className="content pull-left">	
						<View data = {this.state.data} />
						<CommentContainer id={this.props.id} />	
					</div>
			);
		}else{
			return (
					<div className="content pull-left">	
						<Loadding />			
					</div>
			);
		}
		
		
	}
});

var ViewPage = React.createClass({
	render: function() {
		var id = this.props.params.id;
		return (
			<div className="wrap-container">
				<div className="content pull-left">
					<ViewContainer id={id} />
				</div>
				<SideBar />
			</div>
		);
	}
});


module.exports = ViewPage;