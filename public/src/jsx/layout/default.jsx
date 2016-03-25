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
	render: function() {
		moment.locale("zh-cn");
		return (
			<div>
				<Header />
				<Container content={this.props.children} />
				<Footer />				
			</div>
		);
	}
});

module.exports = Default;