import React from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'

const Container = styled.div`
  border: 1px solid rgb(58, 58, 60);
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
      🤝 CoWordle 🤝
    </Title>
    <Button onClick={onShare} colorScheme={'blackAlpha'}>Share</Button>
  </Container>
}

export default Header
