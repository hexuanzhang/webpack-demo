/**
 * 关于我
 */
import { Page } from "../../config";

export let AboutRoute =  {
	title: "关于我",
	path: Page.about,
	
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require("./component"));
		});
	}
};
 