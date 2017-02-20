import "./style.css"

import React, {
    Component
} from 'react'

import {
    render
} from 'react-dom'

import {
    Provider,
} from "react-redux"

import {
    createStore,
    combineReducers
} from "redux"

import {
    Router,
    browserHistory
} from 'react-router'

import {
    routerReducer,
    syncHistoryWithStore
} from 'react-router-redux'

// 写一个测试action
const userList = [{
    "1": "user1"
}, {
    "2": "user2"
}];

export const getUserList = () => {
    return {
        type: "getUserList",
        payload: userList
    }
}

// 封装reducer
const reducer = combineReducers({
    userList: (state = [], action) => {
        switch (action.type) {
            case "getUserList":
                return action.payload;
                break;
            default:
                return state;
        }
    },
    routing: routerReducer,
});

// 创建redux仓库
const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 配置路由切换方式
const history = syncHistoryWithStore(browserHistory, store);

// 路由配置
const rootRoute = {
    childRoutes: [{
        path: '/',
        component: require('./home').default,
    }]
}

// 配置项目构件
class App extends Component {
    render() {
        return (<Provider store = {store} >
				<Router history={history} routes={rootRoute} />
			</Provider>)
    }
}

// 异步JS测试
require.ensure(['./text.js'], function(require) {
    var text = require('./text.js');

    const isEqual = text.default(text.CALL_API);
    // import text from "./text.js"
    // window.onload = () => {
    // document.getElementById("body").innerHTML = `<div id='text'>${isEqual?1:0}css2</div>`;
    // render( <APP /> ,document.getElementById("body") );
    render(<App />, document.getElementById("app"));
});
