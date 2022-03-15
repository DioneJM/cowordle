import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Board, { BoardState } from './Board'
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
  // TODO remove this and solely use the refs below instead
  const [currentGuessAttempt, setCurrentGuessAttempt] = useState(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')

  /**
   * These refs are needed as they can be updated from the event listeners from Keyboard
   * used to listen in on a user's key press
   */
  const currentGuessAttemptRef = useRef<number>(currentGuessAttempt)
  const currentGuessRef = useRef<string>(currentGuess)

  const [guesses, setGuesses] = useState<string[]>([])
  const [boardState, setBoardState] = useState<BoardState>(BoardState.Playing)
  const wordToGuess = 'pilot'

  useEffect(() => {
    console.log(currentGuessAttemptRef.current)
    if (currentGuessAttemptRef.current === MAX_GUESSES && currentGuessRef.current !== wordToGuess) {
      setBoardState(BoardState.Unsuccessful)
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
    if (currentGuessRef.current.length < WORD_LENGTH ||
      boardState === BoardState.Successful ||
      boardState === BoardState.Unsuccessful) {
      return
    }
    if (currentGuessRef.current === wordToGuess) {
      setBoardState(BoardState.Successful)
    }
    setCurrentGuessAttempt(currentGuessAttempt => {
      const nextGuessAttempt = currentGuessAttempt < MAX_GUESSES ? currentGuessAttempt + 1 : currentGuessAttempt
      currentGuessAttemptRef.current = nextGuessAttempt
      return nextGuessAttempt
    })
  }


  return <Wrapper>
    <Header />
    <Content>
      <Board guesses={guesses} boardState={boardState} />
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
