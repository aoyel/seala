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


var SideHot = React.createClass({
	render: function() {
		return (
			<div className="side-box">
				<Title title="热门话题" />
				<Hot onItemClick={this.props.onItemClick} />
			</div>			
		);
	}
});

var SideQrcode = React.createClass({
	render: function() {
		return (
			<div className="side-box">
				<Title title="联系我们" />
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="sidebar pull-right">
				<SideHot onItemClick={this.props.onItemClick} />
				<SideQrcode />
			</div>
		);
	}	
});

module.exports = Container;