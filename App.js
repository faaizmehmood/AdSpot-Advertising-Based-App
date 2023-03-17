import React from 'react';
// import MainNavigator from './src/navigation/MainNavigator';
import {AuthProvider} from './src/context/AuthContext';
import RootNav from './src/navigation/RootNavigation';
// import {SpecialPkg} from './src/screens';
const App = () => {
  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  );
  // return <SpecialPkg />;
};

export default App;
