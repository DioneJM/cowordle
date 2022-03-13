import React from 'react'
import styled from 'styled-components'

const KeyboardWrapper = styled.div`
`

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'],
]

export interface KeyboardProps {
  onClick: (letter: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
}

const Keyboard = ({ onClick, onDelete, onSubmit }: KeyboardProps) => {
  return <KeyboardWrapper>
    {keyboardLayout.map((row, index) => (
      <KeyRow key={index} offsetRow={index === 1}>
        {row.map((key) => (
          <Key key={key} onClick={() => {
            const keyValue = key.toLowerCase()
            if (keyValue === 'enter') {
              onSubmit()
            } else if (keyValue === 'delete') {
              onDelete()
            } else {
              onClick(keyValue)
            }
          }}>
            {key.toUpperCase()}
          </Key>
        ))}
      </KeyRow>
    ))}
  </KeyboardWrapper>
}

const KeyRow = styled.div<{ offsetRow: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0 ${({ offsetRow }) => offsetRow ? '6%' : 0};
`

const Key = styled.button`
  border: none;
  background-color: rgb(129, 131, 132);
  height: 58px;
  padding: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
  color: white;
  border-radius: 8px;
`

export default Keyboard
