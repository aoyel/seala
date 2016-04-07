var React = require('react');
var Content = require('./content.jsx');
var Comment = require('./comment.jsx');
var Loadding = require('./load.jsx');

var View = React.createClass({
	getDefaultProps: function() {
		return {
			active:false,
			id:null
		};
	},
	getInitialState: function() {
		return {
			id:null,
			isLoad:false,
			data:null 
		};
	},
	componentDidUpdate: function(prevProps, prevState) {
		if(this.props.id != prevProps.id){
			var _this = this;
			var id = _this.props.id;
			this.setState({
					id:id,
					isLoad:false 
			});		
			$.get('/view/'+id,function(data) {
				_this.setState({
					isLoad:true,			
					data:data.data
				});				
			});
		}		
	},
	onClose:function(e){		
		this.props.toggleActive();
	},

	render: function() {
		var component = null;
		if (this.state.isLoad) {
			component = <Content data={this.state.data} />;
		}else{
			component = <Loadding />
		}
		var c = "wrap-view";		
		if (this.props.active) {
			c += " active";
		}
		return (
			<div className={c}>
				<a href="javascript:;" onClick={this.onClose} className="close-toggle">×</a>
				<div className="wrap-container">
					<div className="row">
						<div className="col-md-8">
							{component}					
						</div>
						<div className="col-md-4">
							<Comment id={this.state.id} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = View;