import React from "react";
import { render } from "react-dom";
import { Link, IndexLink } from "react-router";
import { Page } from "../../config";

export default class Main extends React.Component {
	
	componentDidMount() {
		$(".nav li").on("click", (event) => {
			$(event.target).parent().addClass("active").siblings().removeClass("active");
		})
	}
	
	componentWillReceiveProps(nextPorps) {
		let { location, routes } = nextPorps;
		
		console.dir(routes);
		if (location && location.pathname === '/') {
		}
		
		this.setDocumentTitle(routes);
	}
	
	setDocumentTitle(routes) {
		let route = routes && routes[routes.length - 1],
			title = route && route.title;
		
		window.document.title = (!title ? '' : title + '｜') + 'demo';
	}
	
	render() {
		let { children } = this.props;
		console.info("render");
		
		return (
			<div className="container">
				<ul className="nav nav-tabs nav-justified">
					<li className="active" data-toggle="tab">
						<IndexLink activeClassName="active" to="/" onlyActiveOnIndex={true}>首页</IndexLink>
					</li>
					<li>
						<Link activeClassName="active" to={ Page.message }>内容</Link>
					</li>
					<li>
						<Link activeClassName="active" to={ Page.about }>关于我</Link>
					</li>
				</ul>
				<div className="tab-content">
					<div className="tab-pane fade in active">
						{ children }
					</div>
				</div>
			</div>
		);
	}
}

