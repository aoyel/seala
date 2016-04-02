var React = require('react');
var ReactDOM = require('react-dom');
var Layout = require('./layout/default.jsx');
var Default = require('./view/default.jsx');
var NotFound = require('./view/notfound.jsx');
var Post = require('./view/post.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;


const App = React.createClass({
	render: function() {
		moment.locale("zh-cn");
		return (
			<Layout content={this.props.children} />
		);
	}
});

ReactDOM.render(
	<Router >
		<Route history={hashHistory} path="/" component={App}>
			<IndexRoute component={Default}/>
			<Route path="/post" component={Post}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>,
	document.body
);