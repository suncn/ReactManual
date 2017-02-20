import React, {
    Component
} from "react"

import {
    connect
} from "react-redux"

import {
    getUserList
} from "./main.js"

class Home extends Component {
    handleClick() {
        this.props.getUserList();
    }

    renderUserList() {
        const userList = this.props.userList;
        if (userList.length > 0) {
			console.log(userList);
			return (<div>查看控制台和redux</div>)
        } else {
            return <div>reducer:<span onClick={this.handleClick.bind(this)}>clickThis</span></div>
        }

    }

    render() {
        return (this.renderUserList())
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.userList
    }
}

export default connect(mapStateToProps, {
    getUserList
})(Home);
