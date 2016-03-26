var React = require('react');
var Link = require('react-router').Link

var Search = React.createClass({
	getDefaultProps: function() {
		return {
			onSearch:null
		};
	},
	getInitialState: function() {
		return {
			q:null 
		};
	},
	onSubmit:function(e){
		this.props.onSearch && this.props.onSearch(this.state.q);
		this.setState({
			q:null 
		});
		e.preventDefault();	
	},
	onChange:function(e){
		this.setState({
			q:e.target.value 
		});
	},
	render: function() {
		return (
			<form onSubmit={this.onSubmit} role='search' className="search-form">
				<input value={this.state.q} onChange={this.onChange} type="text" placeholder="Search..." className="form-control" />
			</form>
		);
	}
});

var Header = React.createClass({
	getDefaultProps: function() {
			return {
				appName:"seala",
				searchUrl:"/search"
			};
	},
	render: function() {
	  	var url = this.props.searchUrl ? this.props.searchUrl : "/search";
	    return (
	    	<header>
		    	<div className="wrap-container">
		    		<Link to="/" className="logo pull-left">{this.props.appName}</Link>
					<div className="pull-right">
						<Search onSearch={this.props.onSearch} url={url} />					
					</div>
					<div className="clearfix"></div>
				</div>
			</header>
	    );
	}
}); 
module.exports = Header;