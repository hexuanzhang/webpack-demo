import * as React from "react";
import { render } from "react-dom";

import "../../../less/about/about";

// img
import about_img_url from "../../../../static/img/about.jpeg";

class About extends React.Component {
	render() {
		return (
			<div>
				<h3 className="about">关于我</h3>
				<img src={ about_img_url } alt=""/>
			</div>
		);
	};
};

module.exports = About;