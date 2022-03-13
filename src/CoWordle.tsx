import React from 'react'
import Header from './Header'
import Board from './Board'
import Keyboard from './Keyboard/Keyboard'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: rgb(18, 18, 19);
  height: 100vh;
  width: 100vw;
`

const CoWordle = () => {
  return <Wrapper>
    <Header />
    <Board />
    <Keyboard />
  </Wrapper>
}

export default CoWordle
