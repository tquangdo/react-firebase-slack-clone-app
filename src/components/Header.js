import React from "react"
import "./Header.css"
import { Avatar } from "@material-ui/core"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { useStateValue } from "../redux/StateProvider"
import { auth } from "../utils/config/firebase"

function Header() {
  const hamHandleLogout = () => {
    localStorage.removeItem('LOCALSTR_LOGIN_USER')
    auth.signOut()
    window.location = '/'
  }
  let [{ user }] = useStateValue()
  if (!user) {
    user = JSON.parse(localStorage.getItem('LOCALSTR_LOGIN_USER'))
  }

  return (
    <div className="header">
      <div className="header__left">
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input style={{ color: "white" }} placeholder="Search DoTQ project" type="text" />
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          title='Logout'
          src={user?.photoURL}
          onClick={hamHandleLogout}
        >Logout</Avatar>
      </div>
    </div>
  )
}

export default Header
