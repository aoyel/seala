var React = require('react');
var marked = require('marked');

var Container = React.createClass({
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

module.exports = Container;