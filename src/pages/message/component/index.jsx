import * as React from "react";
import { render } from "react-dom";

import  "../../../less/message/message";

class Message extends React.Component {
	render() {
		return (
			<h3 className="message">消息</h3>
		);
	};
};

module.exports = Message;