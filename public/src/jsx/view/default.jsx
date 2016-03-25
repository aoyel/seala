var React = require('react');
var List = require('./part/list.jsx');
var SideBar = require('./part/sidebar.jsx');

var Container = React.createClass({
	render: function() {
		return (
			<div className="wrap-container">
				<div className="content pull-left">
					<List url="/list" />
				</div>
				<SideBar />
			</div>
		);
	}
});