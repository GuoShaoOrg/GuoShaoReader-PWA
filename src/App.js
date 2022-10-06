import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './views/Home';

export const AppContext = React.createContext(null);

function App() {

  const appContext = {}

  return (
    <AppContext.Provider value={appContext}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
