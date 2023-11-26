import { memo, useEffect } from 'react'
import { Button, Flex } from 'antd';
import { Netease } from "../services/request"

const home = memo(() => {
  useEffect(() => {
    Netease("/personalized/newsong").then(res=>console.log(res))
  }, [])

  return (
    <div>
      <Flex gap="small" wrap="wrap">
        <Button type="primary">Primary Button</Button>
      </Flex>
    </div>
  )
})

export default home