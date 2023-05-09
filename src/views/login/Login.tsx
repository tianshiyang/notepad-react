import { Tabs } from 'zarm';
import LoginCom from "./components/LoginCom"
import Register from "./components/register"
import { useState } from 'react';

const { Panel } = Tabs;

function Login() {
  const [tabValue, setTabValue] = useState<number>()

  const handleRegisterSuccess = () => {
    setTabValue(0)
  }
  return (
    <>
      <Tabs
        value={tabValue}
        swipeable
      >
        <Panel title="登录">
          <LoginCom />
        </Panel>
        <Panel title="注册">
          <Register success={ handleRegisterSuccess } />
        </Panel>
      </Tabs>
    </>
  )
}

export default Login