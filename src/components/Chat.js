import React, { useState, useEffect, useRef } from "react"
import "./Chat.css"
import { useParams } from "react-router-dom"
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import db from "../utils/config/firebase"
import Message from "./Message"
import ChatInput from "./ChatInput"
import FlipMove from 'react-flip-move'

function Chat() {
  const { roomId } = useParams()
  const [roomDetails, setRoomDetails] = useState(null)
  const [roomMessages, setRoomMessages] = useState([])
  let chatArea = useRef()
  const scrollToBottom = () => {
    chatArea.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    if (roomId) {
      db
        .doc(roomId)
        .onSnapshot(snapshot_item => setRoomDetails(snapshot_item.data()))
    }
    db
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot_item =>
        setRoomMessages(snapshot_item.docs.map(doc => doc.data()))
      )
    scrollToBottom()
  }, [roomId])

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
        <FlipMove style={{ zIndex: -1 }}>
          {roomMessages.map(({ message, timestamp, user, userImage }, chiso) =>
            // PHẢI có <div> như dưới thì FlipMove mới chạy OK
            <div key={chiso}>
              <Message
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            </div>
          )}
        </FlipMove>
      </div>
      <div ref={chatArea} />
      <ChatInput channelName={roomDetails?.name} channelId={roomId} scrollToBottom={scrollToBottom} />
    </div>
  )
}

export default Chat
