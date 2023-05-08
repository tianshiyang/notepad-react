import { Icon, TabBar} from 'zarm'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Nav.less"

const TabIcon = Icon.createFromIconfont(
  '//at.alicdn.com/t/font_2236655_w1mpqp7n1ni.js',
);

function Nav() {
  const location = useLocation()

  const navigate = useNavigate()

  const [activeKey, setActiveKey] = useState<string | number>(location.pathname);

  const handleTabbarChange = (value: string | number) => {
    setActiveKey(value)
    navigate(value as string)
  }

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(['/', '/user', '/data'].includes(location.pathname))
  }, [location.pathname])

  const renderTabBar = () => {
    if (visible) {
      return (
        <>
          <TabBar activeKey={activeKey} className='content' onChange={ handleTabbarChange }>
            <TabBar.Item 
              itemKey="/" 
              title="账单" 
              icon={<TabIcon type="zhangdan" />}
             />
            <TabBar.Item
              itemKey="/data"
              title="统计"
              icon={<TabIcon type="tongji" />}
            />
            <TabBar.Item
              itemKey="/user"
              title="我的"
              icon={<TabIcon type="wode" />}
            />
          </TabBar>
        </>
      )
    }
  }

  return (
    <>
      {renderTabBar()}
    </>
  )
}

export default Nav