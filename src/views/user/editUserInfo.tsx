import { getUserInfoAPI, updateUserInfoAPI } from "@/api"
import { useEffect, useState } from "react"
import { Button, Input, List, Toast } from "zarm"

function EditUserInfo() {
  const [userInfo, setUserInfo] = useState<any>()
  const getUserInfo = () => {
    getUserInfoAPI().then(res => {
      setUserInfo(res.data)
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  const handleChaneUsername  = (value: any) => {
    const data = {...userInfo, username: value}
    setUserInfo(data)
  }

  const handleChangeSignature = (value: any) => {
    const data = {...userInfo, signature: value}
    setUserInfo(data)
  }

  const submit = () => {
    updateUserInfoAPI(userInfo).then(() => {
      Toast.show("修改成功")
    }).catch(err => {
      Toast.show(err.message)
    })
  }
  return (
    <>
    <List>
      <List.Item title="个人信息"></List.Item>
      <List.Item title="头像">
        <img style={{ width: "60px", height: "60px" }} src={userInfo?.avatar}  />
      </List.Item>
      <List.Item title="姓名">
        <Input value={userInfo?.username || ""} placeholder="请输入姓名" disabled onChange={(e: any) => handleChaneUsername(e.target.value)} />
      </List.Item>
      <List.Item title="个性签名">
        <Input value={userInfo?.signature || ""} placeholder="请输入签名" onChange={(e: any) => handleChangeSignature(e.target.value)} />
      </List.Item>
      <List.Item>
        <Button theme="primary" onClick={() => submit()}>提交</Button>
      </List.Item>
    </List>
    </>
  )
}

export default EditUserInfo