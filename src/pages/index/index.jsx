import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from 'react-router';

import Main from "../main";

import { Page } from "../../config";

import { DashboardRoute } from "../dashboard";

import { AboutRoute } from "../about";
import { MessageRoute } from "../message";

// 子路由
let rootChildRoutes = [
	// 关于我
	AboutRoute,
	
	// 消息
	MessageRoute
];

let rootRoute = [{
		path: Page.main,
		
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, Main);
			});
		},
		
		getIndexRoute(location, cb) {
			require.ensure([], (require) => {
				cb(null, DashboardRoute);
			});
		},
		
		getChildRoutes(location, cb) {
			require.ensure([], (require) => {
				cb(null, rootChildRoutes);
			});
		}
	}
];

render(
	(<Router history={ browserHistory } routes={ rootRoute } />),
	document.getElementById("content")
);