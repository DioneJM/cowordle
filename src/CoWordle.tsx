import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Board, { BoardState } from './Board'
import Keyboard from './Keyboard/Keyboard'
import styled from 'styled-components'
import { words } from './words/words'

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

const _MS_PER_DAY = 1000 * 60 * 60 * 24
const cowordleEpochDate: Date = new Date('2022-03-13')

const dateDiffInDays = (date1: Date, date2: Date): number => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const getDaysSinceEpochFrom = (date: Date) => dateDiffInDays(cowordleEpochDate, date)
const today = new Date()
const daysSinceEpoch: number = getDaysSinceEpochFrom(today)
const circularIndex = (daysSinceEpoch % words.length + words.length) % words.length
const wordToGuess = words[circularIndex - 1]
console.log('word to guess: ', wordToGuess)

const CoWordle = () => {
  const [currentGuessAttempt, setCurrentGuessAttempt] = useState(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')

  /**
   * These refs are needed as they can be updated from the event listeners from Keyboard
   * used to listen in on a user's key press
   */
  const currentGuessAttemptRef = useRef<number>(currentGuessAttempt)
  const currentGuessRef = useRef<string>(currentGuess)
  const boardStateRef = useRef<BoardState>(BoardState.Playing)

  const [guesses, setGuesses] = useState<string[]>([])
  const [boardState, setBoardState] = useState<BoardState>(BoardState.Playing)

  useEffect(() => {
    console.log(currentGuessAttemptRef.current)
    if (currentGuessAttemptRef.current === MAX_GUESSES && currentGuessRef.current !== wordToGuess) {
      setBoardState(BoardState.Unsuccessful)
      boardStateRef.current = BoardState.Unsuccessful
      return
    }
    setCurrentGuess('')
    currentGuessRef.current = ''
  }, [currentGuessAttempt])

  useEffect(() => {
    if (currentGuessAttempt >= MAX_GUESSES || boardStateRef.current === BoardState.Successful || boardStateRef.current === BoardState.Unsuccessful) {
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
      boardStateRef.current === BoardState.Successful ||
      boardStateRef.current === BoardState.Unsuccessful) {
      return
    }
    if (currentGuessRef.current === wordToGuess) {
      setBoardState(BoardState.Successful)
      boardStateRef.current = BoardState.Successful
    }
    setCurrentGuessAttempt(currentGuessAttempt => {
      if (boardStateRef.current !== BoardState.Playing) {
        return currentGuessAttempt
      }
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
          onDelete={() => setCurrentGuess(currentGuess => {
            const newGuess = currentGuess.slice(0, -1)
            currentGuessRef.current = newGuess
            return newGuess
          })}
          onSubmit={submitGuess} />
      </KeyboardWrapper>
    </Content>
  </Wrapper>
}

export default CoWordle
