// import React from 'react';
import RoutesComponent from "./routes";

import './App.css';
import AuthProvider from "./auth-component/authProvider";


function App() {

  return (
    <>
    <AuthProvider>
      <RoutesComponent/>
    </AuthProvider>
    </>
  );
}

export default App;