import { memo, useEffect, useLayoutEffect } from "react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab, Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";

import useStore from "store/index";

import Account from "../login/account";
import QrCode from "../login/qrCode";
import Icon from "assets/icon";

export default memo(() => {
  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const netease = useStore((state) => ({
    isLogin: state.netease.isLogin,
    name: state.netease.name,
  }));

  // 网易云用户信息
  let neteaseIcon, neteaseClick, neteaseName;
  if (netease.isLogin) {
    neteaseIcon = <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="h-6 w-6" />;
    neteaseName = netease.name;
    neteaseClick = () => {
      // 打开用户主页
    };
  } else {
    neteaseIcon = <Icon name="netease" size={[26, 26]} />;
    neteaseName = "login";
    neteaseClick = () => {
      onOpen();
    };
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Icon name="user" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="menu">
          <DropdownItem startContent={neteaseIcon} onClick={neteaseClick}>
            {neteaseName}
          </DropdownItem>
          <DropdownItem startContent={<Icon name="qq" size={[26, 26]} />}>login</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} className="h-72">
        <ModalContent>
          <ModalBody>
            {/* TODO:Tabs切换动画在Modal组件中失效:https://github.com/nextui-org/nextui/issues/1300 */}
            <Tabs disabledKeys={["Email"]} aria-label="Options" fullWidth>
              <Tab
                key="Password"
                title={
                  <div className="flex items-center space-x-2">
                    <Icon name="phone" />
                    <span>Phone</span>
                  </div>
                }
              >
                <Account type="Phone" close={onOpenChange} />
              </Tab>
              <Tab
                key="Email"
                title={
                  <div className="flex items-center space-x-2">
                    <Icon name="email" />
                    <span>Email</span>
                  </div>
                }
              >
                <Account type="163 Email" close={onOpenChange} />
              </Tab>
              <Tab
                key="QrCode"
                title={
                  <div className="flex items-center space-x-2">
                    <Icon name="qrCode" />
                    <span>QrCode</span>
                  </div>
                }
              >
                <QrCode close={onOpenChange} />
              </Tab>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
