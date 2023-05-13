import { getUserInfoAPI } from "@/api"
import "./user.less"
import { useEffect, useState } from "react"
import { List } from "zarm"
import { useNavigate } from "react-router-dom"
function User() {
  const [userInfo, setUserInfo] = useState<any>()
  const getUserInfo = () => {
    getUserInfoAPI().then(res => {
      setUserInfo(res.data)
    })
  }
  useEffect(() => {
    getUserInfo()
  })

  const navigate = useNavigate()
  return (
    <>
      <div className="user-content">

        <div className="top">
          <div className="user-base">
            <div className="left">
              <div className="nickname">昵称: {userInfo?.username}</div>
              <div className="sign">签名: {userInfo?.signature}</div>
            </div>
            <div className="right">
              <img src={userInfo?.avatar}></img>
            </div>
          </div>
        </div>

        <div className="user-box">
        <List>
          <List.Item hasArrow title="用户信息更改" onClick={() => navigate("/editUserInfo")} />
          <List.Item hasArrow title="重制密码" onClick={() => navigate("/resetPassword")} />
        </List>
        </div>
      </div>
    </>
  )
}

export default User
