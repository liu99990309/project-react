import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import '@src/styles/index.less'
import App from './app'
import store from '@src/store'
import { Provider } from 'react-redux'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);