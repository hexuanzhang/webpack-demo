/**
 * 首页
 */
export let DashboardRoute =  {
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require("./component"));
		});
	}
};
 