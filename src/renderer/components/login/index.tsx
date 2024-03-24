import { memo } from 'react';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab, Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react';
import { TRANSITION_EASINGS } from '@nextui-org/framer-transitions';

import useStore from 'store/index';
import { cut } from '../../utils';

import Account from './account';
import QrCode from './qrCode';
import Icon from 'components/icon';

export default memo(() => {
  // Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLogin, name, avatar, exit] = useStore((state) => [state.netease.isLogin, state.netease.name, state.netease.avatar, state.exit]);

  // 网易云用户信息
  let neteaseIcon, neteaseClick, neteaseName;
  if (isLogin) {
    neteaseIcon = <Avatar src={cut(avatar, 24)} className="h-6 w-6" />;
    neteaseName = name || '';
    neteaseClick = () => {
      // 打开用户主页
    };
  } else {
    neteaseIcon = <Icon name="netease" size={[26, 26]} />;
    neteaseName = 'login';
    neteaseClick = () => {
      onOpen();
    };
  }

  // 解决 Modal 组件内 Tabs 组件失效,https://github.com/nextui-org/nextui/issues/1300
  const motionProps = {
    variants: {
      enter: {
        scale: 1,
        y: 'var(--slide-enter)',
        opacity: 1,
        transition: {
          scale: {
            duration: 0.4,
            ease: TRANSITION_EASINGS.ease,
          },
          opacity: {
            duration: 0.4,
            ease: TRANSITION_EASINGS.ease,
          },
          y: {
            type: 'spring',
            bounce: 0,
            duration: 0.6,
          },
        },
      },
      exit: {
        scale: 1.1, // NextUI default 1.03
        y: 'var(--slide-exit)',
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: TRANSITION_EASINGS.ease,
        },
      },
    },
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Icon name="user" size={[22, 22]} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="menu">
          <DropdownItem startContent={neteaseIcon} onClick={neteaseClick} textValue="netease">
            {neteaseName}
          </DropdownItem>
          <DropdownItem
            showDivider
            startContent={<Icon name="qq" size={[26, 26]} />}
            onClick={() => {
              onOpen();
            }}
            textValue="qq"
          >
            login
          </DropdownItem>
          {/* TODO: 添加退出成功提示 */}
          <DropdownItem startContent={<Icon name="exit" size={[26, 26]} />} onClick={exit}>
            Exit
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal motionProps={motionProps} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} className="h-72">
        <ModalContent>
          <ModalBody>
            <Tabs disabledKeys={['Email']} aria-label="Options" fullWidth>
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
