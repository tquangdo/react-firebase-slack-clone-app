import React from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Chat from './components/Chat'
import Login from './components/Login'
import { useStateValue } from './redux/StateProvider'

function App() {
  let [{ user }] = useStateValue()
  if (!user) {
    user = JSON.parse(localStorage.getItem('LOCALSTR_LOGIN_USER'))
  }

  return (
    <div className="app">
      <Router>
        {!user
          ? (
            <Login />
          ) : (
            <>
              <Header />
              <div className="app__body">
                <Sidebar />
                <Switch>
                  <Route exact path='/'>
                    <h1>XIN CHÀO!</h1>
                  </Route>
                  <Route path='/room/:roomId'>
                    <Chat />
                  </Route>
                </Switch>
              </div>
            </>
          )
        }
      </Router>
    </div>
  )
}

export default App
