import React from 'react'
import styled from 'styled-components'

export interface BoardProps {
  dimensions: {
    width: number,
    height: number
  }
}

const BoardWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Board = ({ dimensions }: BoardProps) => {
  return <BoardWrapper>
    {Array.from(Array(dimensions.height).keys()).filter(row => row != undefined).map((row) => {
      return <Row key={row} isFirst={row === 0}>
        {Array.from(Array(dimensions.width).keys()).filter(column => column != undefined).map((column) => (
          <Block key={`${row},${column}`} isFirst={column === 0}>{`${row},${column}`}</Block>
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
`

export default Board
