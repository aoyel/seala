var React = require('react');
var List = require('./part/list.jsx');
var SideBar = require('./part/sidebar.jsx');
var View = require('./part/view.jsx');

var Container = React.createClass({
	getInitialState: function() {
		return {
			isViewActive:false,
			curViewId:0
		};
	},
	toggleActive:function(){
		if(this.state.isViewActive){
			this.setState({
				isViewActive:false 
			});
			$('body').css('overflow','auto');
		}else{
			this.setState({
				isViewActive:true 
			});
			$('body').css('overflow','hidden');
		}
	},

	childContextTypes:{
		showView:React.PropTypes.func
	},
	getChildContext: function() {
	    return {
	    	showView: this.onShowView
	    };
	},
	onShowView:function(id,event){
		this.setState({
			curViewId:id
		});
		this.toggleActive();
	},
	render: function() {
		return (
			<div className="wrap-container">
				<div className="content pull-left">
					<List url="/list" />
				</div>
				<SideBar/>
				<View id={this.state.curViewId} active={this.state.isViewActive} toggleActive={this.toggleActive} />
			</div>
		);
	}
});
module.exports = Container;