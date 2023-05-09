import { useEffect, useState } from "react"
import { Popup, Button, Toast} from "zarm"
import "./chooseBillType.less"
import { getBillTypesAPI } from "@/api"

const ChooseBillType = ({ visible = false, onChoose }: { visible: boolean, onChoose: (pay_type_id: any, pay_type_name: any) => void }) => {
  // 获取消费类型
  // 支出
  const [outTypes, setOutTypes] = useState<any[]>([])
  // 收入
  const [comeTypes, setComeTypes] = useState<any[]>([])
  const getBillTypes = () => {
    getBillTypesAPI().then(res => {
      setOutTypes(res.data.filter((item: any) => item.type === 1))
      setComeTypes(res.data.filter((item: any) => item.type === 2))
    }).catch(err => {
      Toast.show(err.messgae)
    })
  }
  
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)
  }, [visible])

  const [activeType, setActiveType] = useState('')

  const handleChoose = (pay_type_id: any, pay_type_name: any) => {
    setShow(false)
    onChoose(pay_type_id, pay_type_name)
  }

  const handleChooseActiveType = (pay_type_id: any, pay_type_name: any) => () => {
    setActiveType(pay_type_id)
    handleChoose(pay_type_id, pay_type_name)
  }

  // 渲染按钮组
  const renderTypesButton = (types: any[]) => {
    return (
      <>
      {
        types.map((item: any) => {
          return (
            <Button
              className="button-style"
              key={item.pay_type_id}
              theme={activeType === item.pay_type_id ? 'primary' : 'default'}
              size="sm"
              onClick={handleChooseActiveType(item.pay_type_id, item.pay_type_name)}>
              { item.pay_type_name }
            </Button>
          )
        })
      }
      </>
    )
  }

  // 渲染筛选项
  const renderSelectOptions = () => {
    return (
      <>
      <div className="popup-box">
        <div className="title">请选择类型</div>
        <div className="popup-content">
          <div>
            <Button
              theme={activeType === '' ? 'primary' : 'default'}
              size="sm"
              onClick={handleChooseActiveType('', '全部类型')}>
              全部类型
            </Button>
          </div>
          <div className="type-title">支出</div>
          {renderTypesButton(outTypes)}
          <div className="type-title">收入</div>
          {renderTypesButton(comeTypes)}
        </div>
      </div>
      </>
    )
  }

  // 初始化
  useEffect(() => {
    getBillTypes()
  }, [])

  return (
    <>
    <Popup
      visible={show}
      direction="bottom"
      width="100%"
    >
      { renderSelectOptions() }
    </Popup>
    </>
  )
}

export default ChooseBillType