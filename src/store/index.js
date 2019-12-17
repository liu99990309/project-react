import { createStore } from 'redux'

export const del = id => ({
    type: 'DEL',
    id
})

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
export default createStore(listReducer)