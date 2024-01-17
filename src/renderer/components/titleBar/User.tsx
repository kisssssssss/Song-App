import { memo, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab, Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";

import Account from "../login/account";
import QrCode from "../login/qrCode";
import Icon from "@assets/icon";
import React from "react";

export default memo(() => {
  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Icon name="user" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="menu">
          <DropdownItem startContent={<Icon name="netease" size={[26, 26]} />} onClick={onOpen}>
            login
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
