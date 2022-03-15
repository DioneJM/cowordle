import React from 'react'
import styled from 'styled-components'
import { MAX_GUESSES, WORD_LENGTH } from './CoWordle'

export enum BoardState {
  Playing,
  Successful,
  Unsuccessful
}

export interface BoardProps {
  guesses: string[]
  boardState: BoardState;
}

const BoardWrapper = styled.div`
  max-width: 500px;
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

const Board = ({ guesses, boardState }: BoardProps) => {
  const guessesRemaining = MAX_GUESSES - guesses?.length ?? MAX_GUESSES
  return <BoardWrapper>
    {guesses?.map((guess, index) => {
      const freeCharacters = WORD_LENGTH - guess.length
      return <Row key={index} isFirst={index === 0}>
        {guess.split('').map((guess, guessIndex) => (
          <Block key={`${index}-${guessIndex}-${guess}`} isFirst={guessIndex === 0}
                 boardState={boardState}>
            {guess.toUpperCase()}
          </Block>
        ))}
        {Array.from(Array(freeCharacters).keys()).map((_, freeIndex) => (
          <EmptyBlock key={`${index}_${freeIndex}_guess_empty`}
                      isFirst={freeIndex === 0}
                      boardState={boardState}
          />
        ))}
        <br />
      </Row>
    })}
    {Array.from(Array(guessesRemaining).keys()).map((_, index) => {
      return <Row key={index} isFirst={guesses.length === 0}>
        {Array.from(Array(WORD_LENGTH).keys()).map((guess, index) => (
          <EmptyBlock key={`${index}_empty`}
                      isFirst={index === 0}
                      boardState={boardState}
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

const Block = styled.div<{ isFirst: boolean, boardState: BoardState }>`
  min-width: 3rem;
  min-height: 3rem;
  border: 2px solid rgb(58, 58, 60);
  color: ${({ boardState }) => getColorFromBoardState(boardState)};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: ${({ isFirst }) => isFirst ? '0' : '4'}px;
  font-weight: 800;
  font-size: 2rem;
`

const EmptyBlock = styled(Block)``

export default Board
