import { useEffect, useState } from "react"
import "./bill.less"
import ChooseBillType from "./chooseBillType/chooseBillType"
import { getBillListAPI } from "@/api"
import { Toast } from "zarm"
import ChooseDate from "./chooseDate/chooseDate"
import moment from "moment"

function Bill() {
  const [visible, setVisible] = useState(false)

  const [payTypeId, setPayTypeId] = useState<any>('')
  const [payTypeName, setPayTypeName] = useState<any>("全部类型")

  const handleChoose = (pay_type_id: any, pay_type_name: any) => {
    setPayTypeId(pay_type_id)
    setPayTypeName(pay_type_name)
    setVisible(false)
  }

  const [billList, setBillList] = useState<any[]>([])
  
  // 获取列表
  const getBillList = () => {
    const params = {
      type_id: payTypeId,
      date,
      page_no: 1,
      page_size: 5
    }
    getBillListAPI(params).then(res => {
      setBillList(res.data)
    }).catch(err => {
      Toast.show(err.message)
    })
  }

  const [showChooseDate, setShowChooseDate] = useState(false)
  const [date, setDate] = useState(moment().format("YYYY-MM"))

  const handleChooseDate = (date: string) => {
    setShowChooseDate(false)
    setDate(date)
  }

	useEffect(() => {
		getBillList();
	}, [ payTypeId, date ]);
  const renderHeader = () => {
    return (
      <>
        <div className="headerBG">
          {/* 头部统计部分 */}
          <div className="statistics">
            <div className="statistics-item">
              总支出：
              <span className="amount">¥123</span>
            </div>
            <div className="statistics-item">
              总收入：
              <span className="amount">¥123</span>
            </div>
          </div>
          {/* 尾部筛选 */}
          <div className="screening-box">
            <div className="screening-item" onClick={() => setVisible(true)}>
              {payTypeName}
            </div>
            <div className="screening-item" onClick={() => setShowChooseDate(true)}>
              { date }
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {renderHeader()}
      <ChooseBillType visible={visible} onChoose={handleChoose} />
      <ChooseDate visible={showChooseDate} onChooseDate={handleChooseDate} />
    </>
  )
}

export default Bill