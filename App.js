import React from 'react';
// import MainNavigator from './src/navigation/MainNavigator';
import {AuthProvider} from './src/context/AuthContext';
import RootNav from './src/navigation/RootNavigation';
import DateTime from './src/screens/DateTime';

const App = () => {
  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  );
  // return <DateTime />;
};
export default App;
