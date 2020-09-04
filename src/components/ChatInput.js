import React, { useState } from "react"
import db from "../utils/config/firebase"
import "./ChatInput.css"
import { useStateValue } from '../redux/StateProvider'
import { fbTimeStamp } from "../utils/config/firebase"

function ChatInput({ channelName, channelId, scrollToBottom }) {
  const [stateInput, setStateInput] = useState("")
  let [{ user }] = useStateValue()
  if (!user) {
    user = JSON.parse(localStorage.getItem('LOCALSTR_LOGIN_USER'))
  }

  const onSendMessage = e => {
    e.preventDefault()

    if (channelId) {
      db.doc(channelId).collection("messages").add({
        message: stateInput,
        timestamp: fbTimeStamp,
        user: user.displayName,
        userImage: user.photoURL,
      })
    }

    setStateInput("") //xóa msg sau khi đã "Gửi"!!!
    scrollToBottom()
  }

  return (
    <div className="chatInput">
      <form>
        <input
          value={stateInput}
          onChange={e => setStateInput(e.target.value)}
          placeholder={`Nhắn tin vô group: #${channelName?.toLowerCase()}`}
        />
        <button type="submit" onClick={onSendMessage}>
          Gửi
        </button>
      </form>
    </div>
  )
}

export default ChatInput
