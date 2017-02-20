import "./style.css"
import React, {
    Component
} from 'react'
import {
    render
} from 'react-dom'

class App extends Component {
    render() {
        return <div>result{this.props.isEqual ? 1 : 0}</div>
    }
}


require.ensure(['./text.js'], function(require) {
    var text = require('./text.js');

    const isEqual = text.default(text.CALL_API);
    // import text from "./text.js"
    // window.onload = () => {
	// document.getElementById("body").innerHTML = `<div id='text'>${isEqual?1:0}css2</div>`;
    // render( <APP /> ,document.getElementById("body") );
	render(<App isEqual = {isEqual} />, document.getElementById("app"));
});
