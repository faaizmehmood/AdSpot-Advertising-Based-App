import React, {useState} from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [splashLoading, setSplashLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        splashLoading,
        setSplashLoading,
        showOnboarding,
        setShowOnboarding,
        loggedIn,
        setLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
