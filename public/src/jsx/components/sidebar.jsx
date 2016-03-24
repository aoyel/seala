var React = require('react');
var Link = require('react-router').Link


var Hot = React.createClass({
	render: function() {
		var data = this.props.data;
		return (
			<li>
				<Link to={`/view/${data.id}`}>{data.title}</Link>
			</li>
		);
	}
});

var HotList = React.createClass({
	getDefaultProps: function() {
		return {
			url:'/list?page=0&pagesize=5&sort=view_count'
		};
	},
	getInitialState: function() {
		return {
			data:[] 
		};
	},
	componentDidMount: function() {
		var _this = this;
		$.get(this.props.url, function(data) {
			_this.setState({
				data: data
			});
		});	
	},
	render: function() {
		var dataset = this.state.data;
		var content = dataset.map(function(val){
			return (
				<Hot data={val} />
			);
		});	
		return (
			<ul>
				{content}
			</ul>
		);
	}
});

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
				<HotList />
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

var SideContainer = React.createClass({
	render: function() {
		return (
			<div className="sidebar pull-right">
				<SideHot />
				<SideQrcode />
			</div>
		);
	}	
});

module.exports = SideContainer;