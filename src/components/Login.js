import React from "react"
import "./Login.css"
import { Button } from "@material-ui/core"
import { auth, provider } from "../utils/config/firebase"
import { useStateValue } from "../redux/StateProvider"
import * as actType from '../redux/action/actiontypes'

function Login() {
  const [, dispatch] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actType.SET_USER,
          user: result.user,
        })
        localStorage.setItem('LOCALSTR_LOGIN_USER', JSON.stringify(result.user))
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Login Slack clone app</h1>
        <p>dotqproject.slack.com</p>
        <Button onClick={signIn}>Login với tài khoản Google</Button>
      </div>
    </div>
  )
}

export default Login
