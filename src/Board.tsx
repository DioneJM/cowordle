import React from 'react'
import styled from 'styled-components'
import { MAX_GUESSES, WORD_LENGTH } from './CoWordle'

export interface BoardProps {
  guesses: string[]
}

const BoardWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Board = ({ guesses }: BoardProps) => {
  const guessesRemaining = MAX_GUESSES - guesses.length
  return <BoardWrapper>
    {guesses.map((guess, index) => {
      return <Row key={index} isFirst={index === 0}>
        {guess.split('').map((guess, index) => (
          <Block key={`${index}-${guess}`} isFirst={index === 0}>{guess.toUpperCase()}</Block>
        ))}
        <br />
      </Row>
    })}
    {Array.from(Array(guessesRemaining).keys()).map((_, index) => {
      return <Row key={index} isFirst={index === 0}>
        {Array.from(Array(WORD_LENGTH).keys()).map((guess, index) => (
          <EmptyBlock key={`${index}_empty`} isFirst={index === 0} />
        ))}
        <br />
      </Row>
    })}

  </BoardWrapper>
}

const Row = styled.div<{ isFirst: boolean }>`
  display: flex;
  margin-top: ${({ isFirst }) => isFirst ? '0' : '4'}px;
`

const Block = styled.div<{ isFirst: boolean }>`
  width: 62px;
  height: 62px;
  border: 2px solid rgb(58, 58, 60);
  color: white;
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
