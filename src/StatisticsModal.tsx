import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'

export interface StatisticsModalProps {
  onShare: () => void;
  onClose: () => void;
  display: boolean;
}

const StatisticsModal = ({ onShare, onClose, display }: StatisticsModalProps) => {
  return <>
    <Modal
      isCentered
      onClose={onClose}
      isOpen={display}
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: 'rgb(18, 18, 19)', color: 'white' }}>
        <ModalHeader>Statistics</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {'Hi there!'}
        </ModalBody>
        <ModalFooter>
          <SharePopover onShare={onShare} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export interface SharePopoverProps {
  onShare: () => void;
}

const SharePopover = ({ onShare }: SharePopoverProps) => {
  return <Popover>
    <PopoverTrigger>
      <Button colorScheme={'green'} onClick={onShare}>Share</Button>
    </PopoverTrigger>
    <PopoverContent backgroundColor={'rgb(18, 18, 19)'}
                    color={'white'}
                    width={'fit-content'}
                    border={'none'}>
      <PopoverBody>
        Copied to clipboard!
      </PopoverBody>
    </PopoverContent>
  </Popover>
}

export default StatisticsModal
