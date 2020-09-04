import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import myReducer, { myInitialState } from './redux/reducer/reducer'
import { StateProvider } from './redux/StateProvider'

ReactDOM.render(
  <StateProvider initialState={myInitialState} reducer={myReducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
