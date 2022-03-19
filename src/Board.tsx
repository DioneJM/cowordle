import React from 'react'
import styled from 'styled-components'
import { MAX_GUESSES, WORD_LENGTH } from './CoWordle'

export enum BoardState {
  Playing = 'playing',
  Successful = 'successful',
  Unsuccessful = 'unsuccessful'
}

export enum LetterState {
  NotPresent,
  InTheWord,
  Correct,
  Blank
}

export interface BoardProps {
  guesses: string[]
  boardState: BoardState;
  wordToGuess: string;
}

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const getColorFromBoardState = (boardState: BoardState): string => {
  switch (boardState) {
    case BoardState.Successful:
      return 'green'
    case BoardState.Unsuccessful:
      return 'red'
    case BoardState.Playing:
    default:
      return 'white'
  }
}

export const getLetterState = (letter: string, position: number, wordToGuess: string) => {
  if (wordToGuess[position] === letter) {
    return LetterState.Correct
  } else if (wordToGuess.includes(letter)) {
    return LetterState.InTheWord
  } else {
    return LetterState.NotPresent
  }
}

const getColorForLetterState = (letterState: LetterState) => {
  switch (letterState) {
    case LetterState.Correct:
      return 'rgb(83, 141, 78)'
    case LetterState.InTheWord:
      return 'rgb(181, 159, 59)'
    case LetterState.NotPresent:
      return 'rgb(58, 58, 60)'
    default:
      return 'rgb(18, 18, 19)'
  }
}

const Board = ({ guesses, boardState, wordToGuess }: BoardProps) => {
  const guessesRemaining = MAX_GUESSES - guesses?.length ?? MAX_GUESSES
  return <BoardWrapper>
    {guesses?.map((guess, index) => {
      const freeCharacters = WORD_LENGTH - guess.length
      const isLatestGuess = index === guesses.length - 1
      const isGuessCorrect = guess === wordToGuess
      return <Row key={index} isFirst={index === 0}>
        {guess.split('').map((letter, guessIndex) => {
          const isFirstOccurrence = guess.indexOf(letter) === guessIndex
          const highlightDuplicate = isFirstOccurrence || wordToGuess[guessIndex] === letter
          const shouldCalculateLetterState = !isLatestGuess || boardState === BoardState.Successful
          const calculatedState = getLetterState(letter, guessIndex, wordToGuess)

          const letterState = shouldCalculateLetterState && (isGuessCorrect || highlightDuplicate) ?
            calculatedState :
            LetterState.NotPresent

          return <Block letterState={letterState}
                        key={`${index}-${guessIndex}-${letter}`}>
            {letter.toUpperCase()}
          </Block>
        })}
        {Array.from(Array(freeCharacters).keys()).map((_, freeIndex) => (
          <EmptyBlock key={`${index}_${freeIndex}_guess_empty`}
                      letterState={LetterState.Blank}
          />
        ))}
        <br />
      </Row>
    })}
    {Array.from(Array(guessesRemaining).keys()).map((_, index) => {
      return <Row key={index} isFirst={guesses.length === 0}>
        {Array.from(Array(WORD_LENGTH).keys()).map((guess, index) => (
          <EmptyBlock key={`${index}_empty`}
                      letterState={LetterState.Blank}
          />
        ))}
        <br />
      </Row>
    })}

  </BoardWrapper>
}

const Row = styled.div<{ isFirst: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ isFirst }) => isFirst ? '0' : '4'}px;
`

const Block = styled.div<{ letterState: LetterState }>`
  min-width: 3rem;
  min-height: 3rem;
  border: 2px solid rgb(58, 58, 60);
  background-color: ${({ letterState }) => getColorForLetterState(letterState)};
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  font-weight: 800;
  font-size: 2rem;

  @media (max-width: 350px) {
    min-width: 2.5rem;
    min-height: 2.5rem;
    font-size: 1.5rem;
  }
`

const EmptyBlock = styled(Block)``

export default Board
