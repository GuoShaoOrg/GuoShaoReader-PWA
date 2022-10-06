import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './views/Home';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { orange, purple } from "@mui/material/colors";

export const AppContext = React.createContext(null);

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
    },
    secondary: {
      main: purple[500],
    },
  },
});

function App() {

  const appContext = {}

  return (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
