import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export const del = id => ({
    type: 'DEL',
    id
})
// 模拟异步操作
export const int = list => dispatch => {
    setTimeout(() => {
        dispatch({
            type: 'INT',
            list
        })
    }, 3000)
}
const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'INT':
            return action.list;
        case 'DEL':
            return state.filter(item => item.id !== action.id)
        default:
            return state
    }
}
export default createStore(listReducer, applyMiddleware(thunk))