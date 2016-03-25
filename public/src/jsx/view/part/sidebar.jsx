var React = require('react');
var Link = require('react-router').Link
var Hot = require('./hot.jsx');



var SideTitle = React.createClass({

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
				<SideTitle title="热门话题" />
				<Hot />
			</div>			
		);
	}
});

var SideQrcode = React.createClass({
	render: function() {
		return (
			<div className="side-box">
				<SideTitle title="关注我们" />
				<img src="http://anquan.baidu.com/bbs/static/image/woldy/bl_wx.png" />	
			</div>
		);
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="sidebar pull-right">
				<SideHot />
				<SideQrcode />
			</div>
		);
	}	
});

module.exports = Container;