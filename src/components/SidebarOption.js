import React from "react"
import "./SidebarOption.css"
import { useHistory } from "react-router-dom"
import db, { fbTimeStamp } from "../utils/config/firebase"

function SidebarOption({ Icon, title, id, isAddChannel }) {
  const history = useHistory()

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`)
    }
  }

  const addChannel = async () => {
    const channelName = prompt("Hãy nhập tên kênh mới:")

    if (channelName) {
      db.add({
        name: channelName,
        timestamp: fbTimeStamp,
      })
    }
    // WHERE x AND ...
    /*
    let query = firebase.firestore().collection("book")
    query = query.where(...)
    query = query.where(...)
    query = query.orderBy(...)
    query.get().then(...)
    */

    // select
    /*
      let collectionRef = firestore.collection('col');
      let documentRef = collectionRef.doc('doc');

      return documentRef.set({x:10, y:5}).then(() => {
      return collectionRef.where('x', '>', 5).select('y').get();
      }).then((res) => {
        console.log(`y is ${res.docs[0].get('y')}.`);
      });
    */
    const snapshot = await db.where('name', '==', channelName).get()
    if (!snapshot.empty) {
      history.push(`/room/${snapshot.docs[0].id}`)
      // snapshot.forEach(doc => {
      //   console.log(doc.id, '=>', doc.data())
      // })
    }
  }

  return (
    <div
      className="sidebarOption"
      onClick={isAddChannel ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
          <h3 className="sidebarOption__channel">
            <span className="sidebarOption__hash">#</span> {title}
          </h3>
        )}
    </div>
  )
}

export default SidebarOption
