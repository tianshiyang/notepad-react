import { resetPasswordAPI } from "@/api"
import { useState } from "react"
import { Button, Input, List, Toast } from "zarm"

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [resetNewPassword, setNewPasssword] = useState("")

  const submit = () => {
    if (resetNewPassword !== newPassword) {
      Toast.show("两次输入不一致")
      return
    }
    const data = {
      oldPassword, 
      newPassword
    }
    resetPasswordAPI(data).then(() => {
      Toast.show('修改成功')
    }).catch(e => {
      Toast.show(e.message)
    })
  }
  return (
    <>
    <List>
      <List.Item title="旧密码">
        <Input value={oldPassword} type="password" placeholder="请输入旧密码" onChange={(value: any) => setOldPassword(value.target.value)} />
      </List.Item>
      <List.Item title="新密码">
        <Input value={newPassword} type="password" placeholder="请输入旧密码" onChange={(value: any) => setNewPassword(value.target.value)} />
      </List.Item>
      <List.Item title="确认新密码">
        <Input value={resetNewPassword} type="password" placeholder="请输入旧密码" onChange={(value: any) => setNewPasssword(value.target.value)} />
      </List.Item>
      <List.Item>
        <Button theme="primary" onClick={submit}>提交</Button>
      </List.Item>
    </List>
    </>
  )
}
export default ResetPassword