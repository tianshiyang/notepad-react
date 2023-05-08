import Router from './router/index'
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import 'zarm/dist/zarm.css'
import Nav from "@/components/Nav/Nav"

function App() {
  return (
    <>
      <BrowserRouter>
        <ConfigProvider locale={zhCN} primaryColor={'#007fff'}>
          <Router />
        </ConfigProvider>
        <Nav />
      </BrowserRouter>
    </>
  )
}

export default App
