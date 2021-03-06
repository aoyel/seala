var React = require('react');
var Link = require('react-router').Link


var Item = React.createClass({
	contextTypes:{
		showView:React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			data:{}
		};
	},
	onClick:function(e){
		var toggle = $(e.target);
		this.context.showView && this.context.showView(toggle.data('id'),e);
	},
	render: function() {
		var data = this.props.data;
		return (
			<li>
				<a href="javascript:;" data-id={data.id} onClick={this.onClick} >{data.title}</a>
			</li>
		);
	}
});

var List = React.createClass({
	getDefaultProps: function() {
		return {
			url:'/list?page=0&pagesize=8&sort=view_count'			
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
			if(data.status == 1){
				_this.setState({
					data: data.data
				});
			}			
		});
	},

	render: function() {
		var _this = this;
		var dataset = _this.state.data;		
		var content = dataset.map(function(val){
			return (
				<Item data={val}/>
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