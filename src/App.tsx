import Router from './router/index'
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import 'zarm/dist/zarm.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <Router></Router>
        </ConfigProvider>
      </BrowserRouter>
    </>
  )
}

export default App
