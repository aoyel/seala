var React = require('react');
var Link = require('react-router').Link;

var Conntainer = React.createClass({
	render: function() {
		return (
			<div className="notfound">
				<h1>404</h1>
				<Link className='text-center' to="/">Home</Link>
			</div>
		);
	}
});

module.exports = Conntainer;