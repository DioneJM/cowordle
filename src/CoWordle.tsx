import React from 'react'
import Header from './Header'
import Board from './Board'
import Keyboard from './Keyboard/Keyboard'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: rgb(18, 18, 19);
  height: 100vh;
  width: 100vw;
  min-width: 350px;
  min-height: 450px;
  overflow: auto;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`

const CoWordle = () => {
  return <Wrapper>
    <Header />
    <Content>
      <Board dimensions={{
        width: 5,
        height: 5,
      }} />
      <Keyboard />
    </Content>
  </Wrapper>
}

export default CoWordle
