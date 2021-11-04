import './App.css';
import Home from './pages/Home'
import Toast from "./component/Toast";
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {orange, purple} from "@material-ui/core/colors";
import React from "react";

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

    return (
        <div className={"App"}>
            <MuiThemeProvider theme={theme}>
                <Home/>
                <Toast ref={(ref) => {
                    Toast.setRef(ref)
                }}/>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
