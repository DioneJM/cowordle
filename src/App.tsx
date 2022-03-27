import React from 'react'
import './App.css'
import CoWordle from './CoWordle'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <CoWordle />
    </ChakraProvider>
  )
}

export default App
