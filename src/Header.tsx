import React from 'react'
import styled from 'styled-components'

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

const Header = () => {
  return <Container>
    <Title>
      🤝 CoWordle 🤝
    </Title>
  </Container>
}

export default Header
