var React = require('react');
var Link = require('react-router').Link;

var Form = React.createClass({
	getInitialState: function() {
		return {
			editor:null,
			title:null,
			tag:null,
		};
	},
	componentDidMount: function() {
		var _this = this;
		var editor = new Editor();
		editor.render();
		_this.setState({
			editor:editor
		});
		// $(".form-tag").tagsInput({
		// 	height:'auto',
		// 	width:'100%',
		// 	defaultText:'添加标签',
		// 	onChange:function(elm,val){
		// 		_this.setState({
		// 			tag:$(elm).val() 
		// 		});
		// 	}
		// });
	},
	handleSubmit:function(e){
		e.preventDefault();
		var params = {};
		params['title'] = this.state.title;
		params['tag'] = this.state.tag;
		params['content'] = this.state.editor.codemirror.getValue();
		console.log(this.state);
		$.post('/post', params, function(data, textStatus, xhr) {
			if(data.status == 1){
				var id = data.data;
				window.location.href = "/";
			}else{
				alert("error");
			}
		});
	},
	handleChange:function(e){		
		var data = {};
		data[e.target.name] = e.target.value;
		this.setState(data);
	},
	render: function() {
		return (
			<form className='post-form' onSubmit={this.handleSubmit}>
				<input placeholder="请输入标题" name="title" type="text" value={this.state.title} onChange={this.handleChange}  className="form-control" />
				<br />
				<div className="wrap-editor">
					<textarea name="content" className="form-control" />
				</div>
				<br />
				<div className="form-group">
					<div className="row">
						<div className="col-sm-5 col-xs-5">
							
						</div>
						<div className="col-sm-7 col-xs-7">
							<input type="submit" className="btn btn-submit pull-right" value="提交" />
						</div>
					</div>				
				</div>
			</form>
		);
	}
});


const Container = React.createClass({
	render: function() {
		return (
			<div className="wrap-container">
				<h3>创建新文章</h3>
				<br />
				<Form />
			</div>
		);
	}
});
module.exports = Container;