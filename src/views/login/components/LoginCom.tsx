import { useState } from 'react';
import { List, Input, Button, Toast } from 'zarm';
import { loginAPI } from "@/api/index"
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState("");
  
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    if (!username) {
      Toast.show("请输入用户名")
    }
    if (!password) {
      Toast.show("请输入密码")
    }
    loginAPI({ username, password }).then(res => {
      localStorage.setItem('token', res.data.token)
      Toast.show('登录成功')
      navigate('/')
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
      <List.Item>
        <Button onClick={handleLogin}>登录</Button>
      </List.Item>
    </List>
    </>
  )
}

export default Login