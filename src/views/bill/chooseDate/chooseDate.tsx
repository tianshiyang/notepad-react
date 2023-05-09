import { useEffect, useState } from 'react';
import { DatePicker } from 'zarm';
import moment from "moment";

function ChooseDate({ visible = false, onChooseDate }: { visible: boolean, onChooseDate: (date: string) => void }) {
  const [show, setShow] = useState(visible)
  const [value, setValue] = useState<Date>()
  const [date, setDate] = useState<any>(moment(value).format('YYYY-MM'))

  useEffect(() => {
    setShow(visible)
  }, [visible])

  const onConfirm = () => {
    setDate(moment(value).format('YYYY-MM'))
    onChooseDate(moment(value).format('YYYY-MM'))
  }
  const handleCancel = () => {
    onChooseDate(date)
  }

  return (
    <>
    <DatePicker
      columnType={['year', 'month']}
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