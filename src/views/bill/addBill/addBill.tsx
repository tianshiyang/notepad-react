import { Button, Keyboard, Popup, Toast } from "zarm"
import "./addBill.less"
import { useEffect, useState } from "react"
import ChooseDate from "../chooseDate/chooseDate"
import moment from "moment"
import PayType from "../payType/payType"
import { commitNewBillAPI } from "@/api"

function AddBill({showAddBill = false, emitClose, handleAddSuccess}: {showAddBill: boolean, emitClose: () => void, handleAddSuccess: () => void}) {
  const [visible, setVisible] = useState(showAddBill)
  useEffect(() => {
    setVisible(showAddBill)
  }, [showAddBill])
  const handleClose = () => {
    setVisible(false)
    emitClose()
  }


  const [pay_type, setPayType] = useState(1)
  const handleChoosePayType = (value: number) => {
    return () => {
      setPayType(value)
    }
  }

  const openClooseTime = () => {
    setShowChooseDate(true)
  }
  const [showChooseDate, setShowChooseDate] = useState(false)
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  const handleChooseDate = (value: string) => {
    setShowChooseDate(false)
    setDate(value)
  }

  const [payTypeId, setPayTypeId] = useState<number>()
  const choosePayId = (value: number) => {
    setPayTypeId(value)
  }

  const [amount, setAmount] = useState("")
  const handleChangeAmount = (value: any) => {
    if (value === 'delete') {
      setAmount(amount.slice(0, -1))
    } else if (value === 'ok') {
      const parmas = {
        date,
        amount,
        type_id: payTypeId,
        pay_type
      };
      commitNewBillAPI(parmas).then(() => {
        Toast.show("新增成功")
        handleClose()
        handleAddSuccess()
      }).catch((error: any) => {
        Toast.show(error.message)
      })
    } else {
      setAmount(amount + value)
    }
  }
  return (
    <>
    <Popup
      visible={visible}
      direction="bottom">
      <div className="popup-box">
        <header style={{ width: "100%", display: "flex", justifyContent: "right" }}>
          <Button theme="danger" size="xs" onClick={handleClose}>关闭</Button>
        </header>
        <div className="title">
          <div className="pay-type">
            <div className={pay_type === 1 ? "tag" : "tag-active"} onClick={handleChoosePayType(1)}>支出</div>
            <div className={pay_type === 2 ? "tag" : "tag-active"} onClick={handleChoosePayType(2)}>收入</div>
          </div>
          <div className="time" onClick={openClooseTime}>05-21</div>
        </div>
      </div>
      <ChooseDate visible={showChooseDate} dateType={["year", "month", "day"]} onChooseDate={handleChooseDate} />
      <div className="amount-content">
        <div className="unit">¥</div>
        <div className="amount">{amount}</div>
      </div>
      <PayType pay_type={pay_type} handleChoosePayId={(value) => choosePayId(value)}></PayType>
      <Keyboard
        type="price"
        onKeyClick={(value) => handleChangeAmount(value)}
      />
    </Popup>
    </>
  )
}

export default AddBill