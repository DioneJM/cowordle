import React from 'react'
import './App.css'
import Dwordle from './Dwordle'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Dwordle />
    </ChakraProvider>
  )
}

export default App
