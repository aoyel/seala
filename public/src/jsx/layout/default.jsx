var React = require('react');
var Header = require('../view/header.jsx');
var Footer = require('../view/footer.jsx');


var Container = React.createClass({
	render: function() {
		return (
			<div className="container">
				{this.props.content}				
			</div>
		);
	}	
});

const Default = React.createClass({
	childContextTypes:{
		query:React.PropTypes.string
	},

	getInitialState: function() {
		return {
			query:null 
		};
	},	

	getChildContext: function() {
	    return {
	    	query: this.state.query
	    };
	},
	
	onSearch:function(q){
		this.setState({
			query:q 
		});
	},

	render: function() {
		return (
			<div id='app'>
				<Header onSearch={this.onSearch} />
				<Container query={this.state.query} content={this.props.content} />
				<Footer />				
			</div>
		);
	}
});

module.exports = Default;