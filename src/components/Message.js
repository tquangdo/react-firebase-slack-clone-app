import React from "react"
import "./Message.css"
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

function Message({ message, timestamp, user, userImage }) {
  dayjs.locale('vi')
  return (
    <div className="message">
      <img src={userImage} alt={user} />
      <div className="message__info">
        <h4>
          {user}{" "}
          <span className="message__timestamp">
            {dayjs(timestamp?.toDate() + '').format('h:mm a, DD MMMM YYYY')}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
