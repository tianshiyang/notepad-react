import { deleteBillAPI, getBillDetailAPI } from "@/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Modal, Toast } from "zarm"
import AddBill from "./addBill/addBill"

function Detail() {
  const {id} = useParams()
  const [billDetail, setBillDetail] = useState<any>()
  const navigate = useNavigate()

  const getBillDetail = () => {
    getBillDetailAPI({id}).then(res => {
      setBillDetail(res.data)
   })
  }

  useEffect(() => {
    getBillDetail()
  }, [])

  const handleDeleteBill = () => {
    Modal.confirm({
      title: '确定要删除吗？',
      content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
      onConfirm: async () => {
        deleteBillAPI({id}).then(() => {
          Toast.show({ content: '删除成功' });
          navigate(-1)
        }).catch(err => {
          Toast.show(err.message)
        })
      },
    });
  }

  const [showEditBill, setShowEditBill] = useState(false)
  return (
    <>
    <ul>
      <li>支付类型: {billDetail?.type?.type_name}</li>
      <li>记录时间: {billDetail?.date}</li>
      <li>备注: {billDetail?.remark}</li>
      <li>开销¥{billDetail?.amount}</li>
    </ul>
    <Button theme="danger" onClick={handleDeleteBill}>删除</Button>
    <Button theme="primary" onClick={() => setShowEditBill(true)}>编辑</Button>
    <AddBill order_id={id} showAddBill={showEditBill} type={2} emitClose={() => setShowEditBill(false)} handleAddSuccess={getBillDetail} />
    </>
  )
}

export default Detail