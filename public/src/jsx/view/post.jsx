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
		var editor = new Editor();
		editor.render();
		this.setState({
			editor:editor
		});
		$(".form-tag").tagsInput({
			height:'auto',
			width:'100%',
			defaultText:'添加标签'
		});
	},
	handleSubmit:function(e){
		e.preventDefault();
		var title = this.state.title;
		var content = this.state.editor.codemirror.getValue();
		$.post('/post', {title: title,content:content}, function(data, textStatus, xhr) {
			if(data.status == 1){
				var id = data.data;
				window.location.href = "/#";
			}else{
				alert("error");
			}
		});
	},
	handleChange:function(e){
		this.setState({
			title:e.target.value 
		});
	},
	render: function() {
		return (
			<form className='post-form' onSubmit={this.handleSubmit}>
				<input placeholder="请输入标题" type="text" value={this.state.title} onChange={this.handleChange}  className="form-control" />
				<br />
				<div className="wrap-editor">
					<textarea name="content" className="form-control" />
				</div>
				<br />
				<div className="form-group">
					<div className="row">
						<div className="col-sm-5 col-xs-5">
							<input type='text' className='pull-left form-control form-tag' />
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