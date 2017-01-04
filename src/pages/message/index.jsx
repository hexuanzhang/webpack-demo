/**
 * 消息
 */
import { Page } from "../../config";

export let MessageRoute =  {
	title: "消息",
	path: Page.message,
	
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require("./component"));
		});
	}
};
 