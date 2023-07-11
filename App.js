import React from 'react';
// import MainNavigator from './src/navigation/MainNavigator';
import {AuthProvider} from './src/context/AuthContext';
import RootNav from './src/navigation/RootNavigation';

const App = () => {
  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  );
};
export default App;
