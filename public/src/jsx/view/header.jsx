var React = require('react');
var Link = require('react-router').Link

var Search = React.createClass({	
	render: function() {
		return (
			<form action="{this.props.url}" role='search' className="search-form">
				<input type="text" placeholder="Search..." className="form-control" />
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
						<Search url={url} />					
					</div>
					<div className="clearfix"></div>
				</div>
			</header>
	    );
	}
}); 
module.exports = Header;