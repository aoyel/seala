var React = require('react');

const Footer = React.createClass({
	render: function() {
		return (
			<footer>
				<p className="text-center">
					<span className='copyright'>Copyright 2015-2016</span>

					<a href='https://seala.link'>@Seala </a>				
				</p>
			</footer>
		);
	}	
});
module.exports = Footer;