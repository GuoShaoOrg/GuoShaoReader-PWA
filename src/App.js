import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './views/Home';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { orange, purple } from "@mui/material/colors";
import Toast from './component/Toast';
import { getAuthToken, storeUserLoginInfo } from './service/UserService';

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


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token
          };

        default:
          break;
      }
    },
    {
      token: getAuthToken()
    }
  )

  const appContext = {
    IsLogin: () => {
      if (state.token === null || state.token === undefined || state.token === "") {
        return false;
      } else {
        return true;
      }
    },
    Login: (token) => {
      dispatch({ type: "RESTORE_TOKEN", token: token });
    },
    LogOut: () => {
      dispatch({ type: "RESTORE_TOKEN", token: "" });
      storeUserLoginInfo(null)
    },
  }

  return (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <Router>
            <Route path='/' component={HomePage} />
        </Router>
        <Toast ref={(ref) => {
          Toast.setRef(ref)
        }} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
