import React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

class Login extends React.Component {
	
	componentDidMount() {
		console.dir(this.props.params);
		console.log(this.props.location);
	}
	
	render() {
		return (
			<div>
				<Link to="/t2?id=1">子路由</Link>
				<Link to="/t3">子路由</Link>
			</div>
		)
	}
}

export default Login;