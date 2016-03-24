var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header.jsx');
var Footer = require('./components/footer.jsx');
var Article = require('./components/article.jsx');

var Content = require('./components/content.jsx');
var View = require('./components/view.jsx');
var Post = require('./components/post.jsx');

var NotFound = require('./components/notfound.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;


var Container = React.createClass({
	render: function() {
		return (
			<div className="container">
				{this.props.content}					
			</div>
		);
	}	
});


const App = React.createClass({
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

ReactDOM.render(
	<Router >
		<Route history={hashHistory} path="/" component={App}>
			<IndexRoute component={Content}/>			
			<Route path="/view/:id" component={View}/>
			<Route path="/post" component={Post}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>,
	document.getElementById('app')
);