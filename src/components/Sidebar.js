import AddIcon from "@material-ui/icons/Add"
import AppsIcon from "@material-ui/icons/Apps"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import CreateIcon from "@material-ui/icons/Create"
import DraftsIcon from "@material-ui/icons/Drafts"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import InboxIcon from "@material-ui/icons/Inbox"
import InsertCommentIcon from "@material-ui/icons/InsertComment"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"
import React, { useEffect, useState } from "react"
import { useStateValue } from "../redux/StateProvider"
import db from "../utils/config/firebase"
import "./Sidebar.css"
import SidebarOption from "./SidebarOption"

function Sidebar() {
  const [stateChannels, setStateChannels] = useState([])
  let [{ user }] = useStateValue()
  if (!user) {
    user = JSON.parse(localStorage.getItem('LOCALSTR_LOGIN_USER'))
  }
  const onBackHome = () => {
    window.location = '/'
  }

  useEffect(() => {
    db.orderBy('timestamp', 'desc').onSnapshot(snapshot_item =>
      setStateChannels(
        snapshot_item.docs.map(doc_item => ({
          id: doc_item.id,
          name: doc_item.data().name,
        }))
      )
    )
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <a type='button' href='#!' onClick={onBackHome} style={{ color: "white" }}> DoTQ project</a>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Thread chat" />
      <SidebarOption Icon={InboxIcon} title="Tag tên & phản ứng" />
      <SidebarOption Icon={DraftsIcon} title="Mục được lưu" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Kênh browser" />
      <SidebarOption Icon={PeopleAltIcon} title="Nhóm user" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={ExpandLessIcon} title="Ẩn bớt đi" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Các kênh" />
      <hr />
      <SidebarOption Icon={AddIcon} isAddChannel title="Thêm kênh mới" />
      {/* Connect to dB and list all the stateChannels */}
      {stateChannels.map((channel_item, chiso) => (
        <SidebarOption key={chiso} title={channel_item.name} id={channel_item.id} />
      ))}
    </div>
  )
}

export default Sidebar
