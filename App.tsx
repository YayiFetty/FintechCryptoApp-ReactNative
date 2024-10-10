import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import RootNavigation from './src/screens/navigation/RootNavigation'
import useCachedResources from './hooks/useCachedResources'
import { useUserStore } from './store/useUserStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 

// Create QueryClient outside of the component
const queryClient = new QueryClient();

const App = () => {
  const isLoadingComplete = useCachedResources();
  const { session, user } = useUserStore();

  if (!isLoadingComplete) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar style="auto"/>
      <QueryClientProvider client={queryClient}>  
        <RootNavigation/>
      </QueryClientProvider>
    </Container>
  )
}

export default App

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`