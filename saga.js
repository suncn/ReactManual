import {
    call,
    put,
    takeEvery,
    takeLatest
} from 'redux-saga/effects'

const fetchUserData = (data) => {
    return data;
}

// 工作的 Saga：當 action 是 USER_FETCH_REQUESTED 時被觸發
function* fetchUser(action) {
    try {
        const user = yield call(fetchUserData, action.payload);
        yield put({
            type: "USER_FETCH_SUCCEEDED",
            user: user
        });
    } catch (e) {
        yield put({
            type: "USER_FETCH_FAILED",
            message: e.message
        });
    }
}

/*
  在每次 dispatch `USER_FETCH_REQUESTED` action 時，啟動 fetchUser。
  允許併發取得使用者。
*/
function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  另外你也可以使用 takeLatest。

  但不允許併發取得使用者。當一個 fetch 已經在 pending 時，如果取得 dispatch「USER_FETCH_REQUESTED」，
  正在等待的 fetch 會被取消，只執行最新的發出的 USER_FETCH_REQUESTED。
*/

/*function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}*/

export default mySaga;
