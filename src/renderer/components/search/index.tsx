import { memo } from 'react';

import Icon from 'components/icon';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Card, CardBody } from '@nextui-org/react';

export default memo(() => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Icon name="search" size={[22, 22]} onClick={onOpen} className="no-region mx-1.5 cursor-pointer transition-all duration-1000 hover:fill-primary-400" />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        backdrop="blur"
        placement="top"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
        classNames={{
          'base':"bg-transparent border-0 shadow-none"
        }}
      >
        <ModalContent>
          {/* TODO:搜索功能 */}
          <Input type="text" size="sm" radius="sm" placeholder="Search" spellCheck={false} />
          <Card isHoverable={true} classNames={{ base: 'mt-5 shadow-none' }} >
            <CardBody>
              <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
          </Card>
        </ModalContent>
      </Modal>
    </>
  );
});
