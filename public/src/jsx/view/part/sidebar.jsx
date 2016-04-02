var React = require('react');
var Link = require('react-router').Link
var Hot = require('./hot.jsx');

var Title = React.createClass({

	getDefaultProps: function() {
		return {
			title:'',
		};
	},
	render: function() {
		return (
			<h5>{this.props.title}</h5>
		);
	}
});


var Article = React.createClass({
	render: function() {
		return (
			<div className="side-box">
				<Title title="热门文章" />
				<Hot />
			</div>			
		);
	}
});




var Qrcode = React.createClass({
	render: function() {
		return (
			<div className="side-box">
				<Title title="联系我们" />				
				<img src="/images/qrcode.png" />
				<br />
				<br />
				<div className="text-center">
					<iframe src="https://ghbtns.com/github-btn.html?user=aoyel&repo=seala&type=star&count=true" width="80px" height="20px"></iframe>
					<iframe src="https://ghbtns.com/github-btn.html?user=aoyel&repo=seala&type=fork&count=true" width="80px" height="20px"></iframe>
				</div>				
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="sidebar pull-right">
				
				<Article />				
				<Qrcode />
			</div>
		);
	}	
});

module.exports = Container;