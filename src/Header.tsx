import React from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'

const Container = styled.div`
  border-bottom: 1px solid rgb(58, 58, 60);
  color: white;
  display: flex;
  padding: 8px;
`

const Title = styled.div`
  font-size: 2rem;
  margin: auto;
  font-weight: 600;
`

export interface HeaderProps {
  onShare: () => void;
}

const Header = ({ onShare }: HeaderProps) => {
  return <Container>
    <Title>
      Dwordle
    </Title>
    <Button style={{ position: 'absolute', right: 16, top: 14 }} onClick={onShare} backgroundColor={'rgb(18, 18, 19)'}
            colorScheme={'blackAlpha'}>🔗</Button>
  </Container>
}

export default Header
