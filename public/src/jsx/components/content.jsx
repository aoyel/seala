var React = require('react');
var Article = require('./article.jsx');
var SideBar = require('./sidebar.jsx');

var Content = React.createClass({
	render: function() {
		return (
			<div className="wrap-container">
				<div className="content pull-left">
					<Article url="/list" />
				</div>
				<SideBar />
			</div>
		);
	}
});
module.exports = Content;