import React, { useEffect, useState } from 'react'
import  './nav.css' 
import notification from "../../img/notification.png";
import message from "../../img/message.png";
import setting from "../../img/settings.png";


function Nav({socket}) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };




  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Notification App</span>
      <div className="icons">
        <div className="icon" onClick={()=> setOpen(!open)}>
          <img src={notification} className='iconImg' alt="" />
          {
            notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={()=> setOpen(!open)}>
          <img src={message} className='iconImg' alt="" />
          <div className="counter">2</div>
        </div>
        <div className="icon" onClick={()=> setOpen(!open)}>
          <img src={setting} className='iconImg' alt="" />
          <div className="counter">2</div>
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

export default Nav