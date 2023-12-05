import { memo } from 'react'
import { Layout, ConfigProvider } from 'antd';

import SideBar from '../SideBar';

const CustomizedLayout = memo((props: any) => {
  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          bodyBg: 'transparent',
          lightSiderBg: 'transparent',
        },
      },
    }}>
      <Layout>
        <Layout.Sider breakpoint='sm' theme='light' width={230}>
          <SideBar />
        </Layout.Sider>
        <Layout.Content>
          {props.children}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
})

export default CustomizedLayout