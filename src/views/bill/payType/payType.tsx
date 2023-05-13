import { getPayTypeListAPI } from "@/api"
import { useEffect, useState } from "react"
import "./payType.less"

function PayType({ pay_type, handleChoosePayId, pay_id }: {pay_type: number, handleChoosePayId: (id: number) => void, pay_id?: number}) {
  const [payTypeList, setPayTypeList] = useState<any[]>([])

  useEffect(() => {
    console.log(pay_id)
    setActivePayId(pay_id)
  }, [pay_id])

  // 获取支付方式
  useEffect(() => {
    getPayTypeListAPI({pay_type})
      .then(res => {
        setPayTypeList(res.data)
      })
  }, [pay_type])

  const [activePayId, setActivePayId] = useState<number>()
  const choosePayId = (pay_type_id: number) => {
    handleChoosePayId(pay_type_id)
    setActivePayId(pay_type_id)
  }

  return (
    <>
      <div className="pay-type-content">
        { payTypeList.map(res => {
          return (
            <div key={res.pay_type_id} className="type-item" onClick={() => choosePayId(res.pay_type_id)}>
              <div className={activePayId === res.pay_type_id ? "active type-image": "type-image"}>{res.pay_type_name[0]}</div>
              <div className="type-text">{res.pay_type_name}</div>
            </div>
          )
        }) }
      </div>
    </>
  )
}

export default PayType