import { Icon, TabBar} from 'zarm'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabIcon = Icon.createFromIconfont(
  '//at.alicdn.com/t/font_2236655_w1mpqp7n1ni.js',
);

function Nav() {

  const navigate = useNavigate()

  const location = useLocation()

  const [activeKey, setActiveKey] = useState<string | number>(location.pathname);

  const handleTabbarChange = (value: string | number) => {
    setActiveKey(value)
    navigate(value as string)
  }

  return (
    <>
      <TabBar activeKey={activeKey} onChange={ handleTabbarChange }>
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

export default Nav