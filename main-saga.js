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
    applyMiddleware,
	combineReducers,
	compose
} from "redux"

import createSagaMiddleware from 'redux-saga'

import mySaga from './saga'

import Home from './home'

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

export function getUserList() {
    return {
        type: "USER_FETCH_REQUESTED",
        payload: userList
    }
}


// 封装reducer
const reducer = combineReducers({
    userList: (state = [], action) => {
        console.log("action", action);
        switch (action.type) {
            case "USER_FETCH_SUCCEEDED":
                return action.user;
                break;
            default:
                return state;
        }
    },
    routing: routerReducer,
});

// 建立 saga middleware
const sagaMiddleware = createSagaMiddleware()

// 建立 saga middleware
// 將 saga middleware mount 在 Store 上
const store = createStore(
    reducer,
    compose(
        applyMiddleware(
            sagaMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
// 建立 saga middleware
// 然後執行 saga
sagaMiddleware.run(mySaga)
    // 配置路由切换方式
const history = syncHistoryWithStore(browserHistory, store);

// 配置路由切换方式
// 路由配置
const rootRoute = {
    childRoutes: [{
        path: '/',
        component: require("./home").default,
    }]
}


// 配置项目构件
class App extends Component {
    render() {
        return (<Provider store = {store} > 
			<Router history = {history} routes = {rootRoute} /> 
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
})
