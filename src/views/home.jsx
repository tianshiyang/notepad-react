import { Button } from 'zarm';
import "./home.less"
import { useEffect } from 'react';
import { test } from '../api/index';


function Home() {
  useEffect(() => {
    test()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err, 'error')
    }
    , [])
  })
  return (
    <>
      <div>Home</div>
      <Button theme='primary'>按钮</Button>
      <div className='test'></div>
    </>
  )
}

export default Home