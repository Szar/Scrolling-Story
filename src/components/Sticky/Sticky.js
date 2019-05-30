import React from 'react';
import enterView from 'enter-view';
import './Sticky.scss';


class Sticky extends React.Component {
	constructor(props) {
		super(props);
		this.state = { style: {} }
	}
	
	componentDidMount() {

		const t = this,
			w = document.getElementsByTagName("body")[0].getBoundingClientRect().width
		if(w>836) {
			enterView({
				selector: '#'+this.props.id,
				offset: 0.25,
				enter: function(e){
					if (e.getElementsByClassName('asset').length > 0) {
						t.setState({'style':{'top':window.innerHeight/2 - e.getElementsByClassName('asset')[0].getBoundingClientRect().height / 2}});
					}
				},
				progress: function(e, p) {
					t.props.onProgress(e,p)	
				}
			});
		}
		
	}

	renderDefault() {
		const asset = <div className="sticky--item" style={ this.state.style }>{ this.props.asset }</div>,
			text = <div className="sticky--text">{ this.props.text }</div>
			return <div className="sticky--container" id={this.props.id}>
				{this.props.align==="right"?asset:text}
				{this.props.align==="right"?text:asset}
			</div>
	}
	renderOverlay() {
			return <div className="sticky--container sticky--overlay" id={this.props.id}>
				<div className="sticky--item" style={ this.state.style }>{ this.props.asset }</div>
				<div className="sticky--text">{ this.props.text }</div>
			</div>
	}
	
	
	render() {
		return this.props.align==="center"?this.renderOverlay():this.renderDefault();
	}
}

export default Sticky;