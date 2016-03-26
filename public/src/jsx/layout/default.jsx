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
	getInitialState: function() {
		return {
			query:null 
		};
	},

	onSearch:function(q){
		this.setState({
			query:q 
		});
		console.log(q);
	},
	render: function() {
		return (
			<div>
				<Header onSearch={this.onSearch} />
				<Container query={this.state.query} content={this.props.content} />
				<Footer />				
			</div>
		);
	}
});

module.exports = Default;