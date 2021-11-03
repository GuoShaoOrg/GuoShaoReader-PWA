import './App.css';
import Home from './pages/Home'
import Toast from "./component/Toast";
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {orange, purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShareFeedItemPage from "./pages/ShareFeedItemPage";
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
                <Router>
                    <Route exact path={"/share/feed/item/:itemId"} component={ShareFeedItemPage}/>
                    <Route exact path={"/"} component={Home}/>
                </Router>
                <Toast ref={(ref) => {
                    Toast.setRef(ref)
                }}/>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
