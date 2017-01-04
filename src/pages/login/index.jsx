import React from "react";
import { render } from "react-dom";
import Login from "./component/index";

class LoginRoute extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.children || <Login params={ this.props.params } location={ this.props.location } />
				}
			</div>
		);
	}
}

module.exports = LoginRoute;