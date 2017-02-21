import React, {
    Component
} from "react"

import {
    connect
} from "react-redux"

import {
    getUserList
} from "./main-saga"

class Home extends Component {
    handleClick() {
        this.props.getUserList();
    }

    renderUserList() {
        const userList = this.props.userList;
        if (userList.length > 0) {
            return <ul>
				{userList.map((item,i)=>{
					return <li key={i} > {item[i+1]} </li>
				})}
			</ul>
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
