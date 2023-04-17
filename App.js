import React from 'react'
import { SafeAreaProvider } 
       from 'react-native-safe-area-context'
import Navigation from './src/components/Navigation'
import 'react-native-reanimated'

export default function App(){
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}