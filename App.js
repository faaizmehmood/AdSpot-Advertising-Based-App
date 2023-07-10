import React from 'react';
// import MainNavigator from './src/navigation/MainNavigator';
import {AuthProvider} from './src/context/AuthContext';
import RootNav from './src/navigation/RootNavigation';
import DateTime from './src/screens/DateTime';
import ShowPackages from './src/screens/ShowPackages';
// import {PremiumPkg} from './src/screens';
const App = () => {
  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  );
  // return <ShowPackages />;
  // return <DateTime />;
};
export default App;
