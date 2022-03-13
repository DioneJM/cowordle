import React, { useEffect, useState } from 'react'
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
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(() => {
    if (currentGuessAttempt === MAX_GUESSES) {
      console.log('no more guesses remaining :(')
      return
    }
    setCurrentGuess('')
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

  return <Wrapper>
    <Header />
    <Content>
      <Board guesses={guesses} />
      <KeyboardWrapper>
        <Keyboard onClick={(letter) => setCurrentGuess(currentGuess => {
          if (currentGuess.length < WORD_LENGTH) {
            return currentGuess + letter
          } else {
            return currentGuess
          }
        })}
                  onDelete={() => setCurrentGuess(currentGuess => currentGuess && currentGuess.slice(0, -1))}
                  onSubmit={() => setCurrentGuessAttempt(currentGuessAttempt =>
                    currentGuessAttempt < MAX_GUESSES ? currentGuessAttempt + 1 : currentGuessAttempt)} />
      </KeyboardWrapper>
    </Content>
  </Wrapper>
}

export default CoWordle
