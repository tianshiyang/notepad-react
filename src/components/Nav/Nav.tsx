import { Icon, TabBar} from 'zarm'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
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
          icon={<TabIcon type="home" />}
         />
        <TabBar.Item
          itemKey="/data"
          title="统计"
          icon={<TabIcon type="menu" />}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<TabIcon type="user" />}
        />
      </TabBar>
    </>
  )
}

export default Nav