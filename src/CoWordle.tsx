import React, { useEffect, useRef, useState } from 'react'
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
`

const KeyboardWrapper = styled.div`
  position: fixed;
  bottom: 0;
`

const CoWordle = () => {
  const [currentGuessAttempt, setCurrentGuessAttempt] = useState(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const currentGuessRef = useRef<string>(currentGuess)
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(() => {
    if (currentGuessAttempt === MAX_GUESSES) {
      console.log('no more guesses remaining :(')
      return
    }
    setCurrentGuess('')
    currentGuessRef.current = ''
  }, [currentGuessAttempt])

  useEffect(() => {
    if (currentGuessAttempt >= MAX_GUESSES) {
      return
    }
    setGuesses(guesses => {
      const newGuesses = [...guesses]
      newGuesses[currentGuessAttempt] = currentGuess
      return [...newGuesses]
    })
  }, [currentGuess])

  const submitGuess = () => {
    if (currentGuessRef.current.length < WORD_LENGTH) {
      return
    }
    setCurrentGuessAttempt(currentGuessAttempt =>
      currentGuessAttempt < MAX_GUESSES ? currentGuessAttempt + 1 : currentGuessAttempt)
  }


  return <Wrapper>
    <Header />
    <Content>
      <Board guesses={guesses} />
      <KeyboardWrapper>
        <Keyboard
          onClick={(letter) => {
            setCurrentGuess(currentGuess => {
              const newGuess = currentGuess.length < WORD_LENGTH ?
                currentGuess + letter :
                currentGuess
              currentGuessRef.current = newGuess
              return newGuess
            })
          }}
          onDelete={() => setCurrentGuess(currentGuess => currentGuess.slice(0, -1))}
          onSubmit={submitGuess} />
      </KeyboardWrapper>
    </Content>
  </Wrapper>
}

export default CoWordle
