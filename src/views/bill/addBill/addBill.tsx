import { Button, Popup } from "zarm"
import "./addBill.less"
import { useEffect, useState } from "react"
import ChooseDate from "../chooseDate/chooseDate"
import moment from "moment"

function AddBill({showAddBill = false, emitClose}: {showAddBill: boolean, emitClose: () => void}) {
  const [visible, setVisible] = useState(showAddBill)
  useEffect(() => {
    setVisible(showAddBill)
  }, [showAddBill])
  const handleClose = () => {
    setVisible(false)
    emitClose()
  }


  const [currentTag, setCurrentTag] = useState("out")
  const handleChoosePayType = (value: string) => {
    return () => {
      setCurrentTag(value)
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
            <div className={currentTag === "out" ? "tag" : "tag-active"} onClick={handleChoosePayType("out")}>支出</div>
            <div className={currentTag === "in" ? "tag" : "tag-active"} onClick={handleChoosePayType("in")}>收入</div>
          </div>
          <div className="time" onClick={openClooseTime}>05-21</div>
        </div>
      </div>
      <ChooseDate visible={showChooseDate} dateType={["year", "month", "day"]} onChooseDate={handleChooseDate} />
    </Popup>
    </>
  )
}

export default AddBill