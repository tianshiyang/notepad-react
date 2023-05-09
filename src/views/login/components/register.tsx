import { useState } from 'react';
import { List, Input, Button, Toast } from 'zarm';
import { registerAPI } from "@/api/index"

function Register({ success }: { success: () => void }) {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState("");

  const [rePassword, setRePassword] = useState("")
  
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }
  
  const handleRePasswordChange = (e: any) => {
    setRePassword(e.target.value)
  }

  const handleLogin = () => {
    if (!username) {
      Toast.show("请输入用户名")
      return
    }
    if (!password) {
      Toast.show("请输入密码")
      return
    }
    if (rePassword !== password) {
      Toast.show("两次输入不对")
      return
    }
    registerAPI({ username, password }).then(() => {
      success()
      Toast.show('注册成功，清登录')
    }).catch(err => {
      Toast.show(err.message)
    })
  }
  return (
    <>
    <List>
      <List.Item title="用户名">
        <Input
          placeholder="请输入用户名"
          value={username}
          onChange={(value: any) => {
            setUsername(value.target.value);
          }}
        />
      </List.Item>
      <List.Item title="密码">
        <Input
          type="password"
          placeholder="请输入"
          value={password}
          onChange={handlePasswordChange}
        />
      </List.Item>
      <List.Item title="二次认证">
        <Input
          type="password"
          placeholder="请输入"
          value={rePassword}
          onChange={handleRePasswordChange}
        />
      </List.Item>
      <List.Item>
        <Button onClick={handleLogin}>注册</Button>
      </List.Item>
    </List>
    </>
  )
}

export default Register