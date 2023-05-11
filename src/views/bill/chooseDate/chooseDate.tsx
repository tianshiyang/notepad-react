import { useEffect, useState } from 'react';
import { DatePicker } from 'zarm';
import moment from "moment";

function ChooseDate({ visible = false, onChooseDate, dateType = ['year', 'month'] }: { visible: boolean, onChooseDate: (date: string) => void, dateType?: any[] }) {
  const [show, setShow] = useState(visible)
  const [value, setValue] = useState<Date>()
  const [date, setDate] = useState<any>(moment(value).format('YYYY-MM-DD'))

  useEffect(() => {
    setShow(visible)
  }, [visible])

  const onConfirm = () => {
    setDate(moment(value).format('YYYY-MM-DD'))
    onChooseDate(moment(value).format('YYYY-MM-DD'))
  }
  const handleCancel = () => {
    onChooseDate(date)
  }

  return (
    <>
    <DatePicker
      columnType={dateType}
      value={value}
      visible={show}
      onChange={(value) => setValue(value)}
      onConfirm={() => onConfirm()}
      onCancel={() => handleCancel()}
    />
    </>
  )
}

export default ChooseDate