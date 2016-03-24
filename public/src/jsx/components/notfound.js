var React = require('react');
var Link = require('react-router').Link;

const NotFound = React.createClass({
	render: function() {
		return (
			<div className="notfound">
				<h1>404</h1>
				<Link className='text-center' to="/">Home</Link>
			</div>
		);
	}
});
module.exports = NotFound;