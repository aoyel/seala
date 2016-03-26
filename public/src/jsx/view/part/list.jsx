var React = require('react');
var Link = require('react-router').Link

var Article = React.createClass({
	getInitialState: function() { 
		return {
			page:0,			//
			data:[],			// article dataset
			isDone:false
		};
	},
	getDefaultProps: function() {
		return {
			onItemClick:null
		};
	},
	loadData:function(url,page,callback){
		page = page || 0;
		$.get(url,{page:page},function(data){
			callback && callback(data);
		},"json");
	},
	componentDidMount: function() {
		var _this = this;
		_this.loadData(this.props.url,this.state.page,function(data){			
			_this.setState({data:data});
		});
	},
	onLoadMore:function(callback){
		var _this = this;
		var dataset = this.state.data;
		var page = _this.state.page;
		_this.setState({page:page + 1});
		_this.loadData(this.props.url,++page,function(data){
			if(data.length > 0){
				for(i in data){
					dataset.push(data[i]);
				}
			}else{
				_this.setState({
					isDone:true 
				});
			}
			_this.setState({data:dataset});
			callback && callback();
		});
	},
	render: function() {
		return (
			<div className="article-box">
				<List data={this.state.data} onItemClick={this.props.onItemClick} />
				<Load isDone={this.state.isDone} onLoadMore={this.onLoadMore} />
			</div>
		);
	}
});

var List = React.createClass({
	getDefaultProps: function() {
		return {
			onItemClick:null
		};
	},
	render: function() {
		var dataset = this.props.data;
		var content = "";
		var _this = this;
		var colors = [
			'#5fbeaa','#5d9cec','#81c868','#34d3eb','#ffbd4a','#f05050','#4c5667','#7266ba','fb6d9d'
		];
		var i = 0;
		if(dataset.length >= 0){
			content = dataset.map(function(val){
				var color = colors[i % colors.length-1];
				i++;
				return (
					<Item data={val} color={color} onItemClick={_this.props.onItemClick} />
				);
			});	
		}	
		return (
			<div className="article-list">
				{content}
			</div>
		);
	}
});

var Item = React.createClass({
	getDefaultProps: function() {
		return {
			color:'#5fbeaa'
		};
	},
	onClick:function(e){
		var target = $(e.target);
		this.props.onItemClick(target.data('id'),e);
	},
	render: function() {
		var dataset = this.props.data;
		return (
			<div className="article">
				<span style={{background:this.props.color}} className='mid-logo'>{dataset.title.substring(0,1)}</span>
				<a href='javascript:;' data-id={dataset.id} className="title" onClick={this.onClick} >
						{dataset.title}
				</a>
				<time>{moment((dataset.create_time*1000)).fromNow()}</time>				
				<div className="clearfix"></div>
			</div> 			
		);
	}
});

var Load = React.createClass({
	getInitialState: function() {
		return {
			isLoadding:false
		};
	},
	onLoadMore:function(){
		var _this = this;
		if(_this.state.isLoadding){
			return true;
		}
		_this.setState({isLoadding:true});
		_this.props.onLoadMore(function(){
			_this.setState({isLoadding:false});
		});
	},
	render: function() {
		var text = "点击加载更多";
		if(this.props.isDone){
			text = "没有更多内容了";
		}else if(this.state.isLoadding){
			text = "正在加载..";
		}
		return (
			<a href="javascript:;" className="load text-center" onClick={this.props.isDone ? null : this.onLoadMore}>{text}</a>
		);
	}
});

module.exports = Article;