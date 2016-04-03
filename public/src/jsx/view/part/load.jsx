var React = require('react');

var Container = React.createClass({
	render: function() {
		return (
			<div className="loadding">
				<div className="spinner">
					<div className="double-bounce1"></div>
					<div className="double-bounce2"></div>
				</div>
			</div>
		);
	}
});

module.exports = Container;