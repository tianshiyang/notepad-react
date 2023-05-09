import { Tabs } from 'zarm';
import LoginCom from "./components/LoginCom"

const { Panel } = Tabs;

function Login() {
  const handleTabsChange = () => {}
  return (
    <>
      <Tabs
        swipeable
        onChange={handleTabsChange}
      >
        <Panel title="登录">
          <LoginCom />
        </Panel>
        <Panel title="注册">
          <div className="content">试试点我右滑</div>
        </Panel>
      </Tabs>
    </>
  )
}

export default Login