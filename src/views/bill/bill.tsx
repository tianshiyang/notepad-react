import { useEffect, useRef, useState } from "react"
import "./bill.less"
import ChooseBillType from "./chooseBillType/chooseBillType"
import { getBillListAPI } from "@/api"
import { Affix, Button, Pull, Toast } from "zarm"
import ChooseDate from "./chooseDate/chooseDate"
import moment from "moment"
import AddBill from "./addBill/addBill"

function Bill() {
  const [visible, setVisible] = useState(false)

  const [payTypeId, setPayTypeId] = useState<any>('')
  const [payTypeName, setPayTypeName] = useState<any>("全部类型")
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState<any>(0)

  const handleChoose = (pay_type_id: any, pay_type_name: any) => {
    setPageNo(1)
    setTotal(0)
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
      page_no: pageNo,
      page_size: 5
    }
    getBillListAPI(params).then(res => {
      if (pageNo !== 1) {
        setBillList(billList.concat(res.data.list))
      } else {
        setBillList(res.data.list)
      }
      setTotal(res.data.total)
    }).catch(err => {
      Toast.show(err.message)
    })
  }

  const [showChooseDate, setShowChooseDate] = useState(false)
  const [date, setDate] = useState(moment().format("YYYY-MM"))

  const handleChooseDate = (value: string) => {
    setPageNo(1)
    setTotal(0)
    setShowChooseDate(false)
    setDate(moment(value).format("YYYY-MM"))
  }

  const [showAddBill, setShowAddBill] = useState(false)

	useEffect(() => {
    setPageNo(1)
    setTotal(0)
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

  const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
  };
  
  const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
  };

  const pullRef = useRef<any>()
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal)
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  // 上拉刷新
  const refreshData = () => {
    setPageNo(1)
    setRefreshing(REFRESH_STATE.loading)
    getBillList()
    setRefreshing(REFRESH_STATE.success)
  }

  const loadData = () => {
    setPageNo(pageNo + 1)
    setLoading(LOAD_STATE.loading);
    getBillList()
    setLoading(LOAD_STATE.success)
  };

  const RenderList = ({item}: {item: any}) => {
    return(
      <>
        <div className="card">
          <div className="card-title">
            <div className="date">{item?.date}</div>
            <div className="amount-box">
              <div className="amount-item">
                <div className="amout-type">{item?.pay_type === 1 ? '支' : '出'}</div>
                <div className={item?.pay_type === 1 ? 'amount-come' : 'amount-out'}>{item?.pay_type === 1 ? '-' : '+'} ¥{item?.amount}</div>
              </div>
            </div>
          </div>

          <div className="cost-content">
            <div className="cost-top">
              <div>{item?.type?.type_name}</div>
              <div className="cost-remark">{item?.remark}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {renderHeader()}
      <Pull
        ref={pullRef}
        style={{ overflowY: 'auto', maxHeight: 400 }}
        refresh={{
          state: refreshing,
          handler: refreshData,
        }}
        load={{
          state: loading,
          distance: 200,
          handler: loadData,
        }}
        >
        {billList.map(item => <RenderList key={item?.id} item={item} />)}
      </Pull>
      <Affix offsetBottom={20}>
        <Button theme="primary" size="sm" onClick={() => setShowAddBill(true)}>新增</Button>
      </Affix>
      <AddBill showAddBill={showAddBill} emitClose={() => setShowAddBill(false)} handleAddSuccess={getBillList} />
      <ChooseBillType visible={visible} onChoose={handleChoose} />
      <ChooseDate visible={showChooseDate} onChooseDate={handleChooseDate} />
    </>
  )
}

export default Bill