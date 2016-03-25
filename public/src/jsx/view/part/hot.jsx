var React = require('react');
var Link = require('react-router').Link


var Item = React.createClass({
	getDefaultProps: function() {
		return {
			data:{}
		};
	},
	render: function() {
		var data = this.props.data;
		return (
			<li>
				<Link to={`/view/${data.id}`}>{data.title}</Link>
			</li>
		);
	}
});

var List = React.createClass({
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
	load:function(url,callback){
		$.get(url, function(data) {
			callback && callback(data);
		});	
	},
	componentDidMount: function() {
		var _this = this;
		_this.load(this.props.url, function(data) {
			_this.setState({
				data: data
			});
		});
	},

	render: function() {
		var dataset = this.state.data;
		var content = dataset.map(function(val){
			return (
				<Item data={val} />
			);
		});	
		return (
			<ul>
				{content}
			</ul>
		);
	}
});


module.exports = List;