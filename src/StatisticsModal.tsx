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
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import useWindowDimensions from './useWindowDimensions'

export interface StatisticsModalProps {
  onShare: () => void;
  onClose: () => void;
  display: boolean;
}

const StatisticsModal = ({ onShare, onClose, display }: StatisticsModalProps) => {
  const { width } = useWindowDimensions()
  return <>
    <Modal
      size={width <= 400 ? 'xs' : 'md'}
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
  return <Popover closeOnBlur>
    {({ isOpen }) => (
      <>
        <PopoverTrigger>
          <Button colorScheme={'green'} onClick={onShare}>{isOpen ? 'Copied!' : 'Share'}</Button>
        </PopoverTrigger>
      </>
    )}
  </Popover>
}

export default StatisticsModal
