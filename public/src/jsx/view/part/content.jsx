var React = require('react');


var Content = React.createClass({
	rawMarkup:function(){
		var content = this.props.data.content;
		var rawMarkup = marked(content,{sanitize:true});
		return {__html: content};
	},
	render: function() {
		var data = this.props.data;
		return (
			<div className="article-view content-block">
				<h2>{data.title}</h2>				
				<div className="tool-box">
					<span><i className='icon icon-calendar' ></i>{moment(Date.parse(data.create_at)).fromNow()}</span>
					<span><i className='icon icon-eye' ></i>{data.view_count}</span>
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

module.exports = Content;