import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './provider/AuthProvider'
import './main.scss'

function App() {
  return (
    <section className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </section>
  );
}

export default App;

