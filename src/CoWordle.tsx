import React from 'react'
import Header from './Header'
import Board from './Board'
import Keyboard from './Keyboard/Keyboard'
import styled from 'styled-components'

export const MAX_GUESSES = 6
export const WORD_LENGTH = 5

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
  //justify-content: space-between;
`

const KeyboardWrapper = styled.div`
  position: fixed;
  bottom: 0;
`

const CoWordle = () => {
  const guesses = [
    'pilot',
  ]
  return <Wrapper>
    <Header />
    <Content>
      <Board guesses={guesses} />
      <KeyboardWrapper>
        <Keyboard onClick={(letter) => console.log(`${letter} clicked`)}
                  onDelete={() => console.log('delete clicked')}
                  onSubmit={() => console.log('submit clicked')} />
      </KeyboardWrapper>
    </Content>
  </Wrapper>
}

export default CoWordle
