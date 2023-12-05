import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Divider, Input } from 'antd'
import { AudioOutlined, CloseOutlined, MinusOutlined, SettingOutlined, BellOutlined, CloudOutlined, SkinOutlined, DownloadOutlined, FullscreenOutlined } from "@ant-design/icons"
import { Maximize } from "@renderer/assets/svg"

import Wrapper from "./style"

const titleBar = memo(() => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Input className='input' />
      <Flex justify='flex-end' align='center'>
        {/* 外观 */}
        <SkinOutlined className='btn' />
        {/* 下载 */}
        <DownloadOutlined className='btn' onClick={() => { navigate("/download") }} />
        {/* 云盘 */}
        <CloudOutlined className='btn' />
        {/* 听歌识曲 */}
        <AudioOutlined className='btn' />
        {/* 通知 */}
        <BellOutlined className='btn' />
        {/* 设置 */}
        <SettingOutlined className='btn spin' onClick={() => { navigate("/set") }} />

        <Divider type="vertical" />
        {/* 全屏 */}
        <FullscreenOutlined className='btn spin' />
        {/* 最小化 */}
        <MinusOutlined className='btn spin' onClick={() => { window.electron.minimize() }} />
        {/* 最大化 */}
        <Maximize className='btn spin' onClick={() => { window.electron.maximize() }} />
        {/* 关闭 */}
        <CloseOutlined className='btn spin' onClick={() => { window.electron.close() }} />
      </Flex>
    </Wrapper>
  )
})

export default titleBar