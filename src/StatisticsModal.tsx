import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

export interface StatisticsModalProps {
  onClose: () => void;
  display: boolean;
}

const StatisticsModal = ({ onClose, display }: StatisticsModalProps) => {
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default StatisticsModal
