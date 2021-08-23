import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import GSBottomNavigation from "../component/GSBottomNavigation";
import TimelineFeedPage from "./TimelineFeedPage";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

export const AppContext = React.createContext(null);

function Home() {
    const classes = useStyles();
    const bottomTabRef = useRef(null)
    const topBarRef = useRef(null)
    const containerRef = useRef(null)
    const pageContainerRef = useRef(null)
    const [pageHeight, setPageHeight] = useState(0)
    const [topBarHeight, setTopBarHeight] = useState(0)

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        token: action.token,
                    };
                case "SET_TITLE":
                    return {
                        ...prevState,
                        title: action.title,
                    };
            }
        },
        {
            token: "",
            title: ""
        },
    );

    const authContext = {
        Login: (token) => {
            dispatch({type: "RESTORE_TOKEN", token: token});
        },
        LogOut: () => {

        },
        GetCPageHeight: () => {
            return pageHeight
        },
        SetTopBarTitle: (title) => {
            dispatch({type: "SET_TITLE", title: title});
        }
    };

    useEffect(() => {
        setTopBarHeight(topBarRef.current.clientHeight)
        setPageHeight(containerRef.current.clientHeight - bottomTabRef.current.clientHeight - topBarRef.current.clientHeight)
    }, [state.token])


    return (
        <AppContext.Provider value={authContext}>
            <Router>
                <AppBar ref={topBarRef} color="inherit" position="fixed">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>{state.title}</Typography>
                    </Toolbar>
                </AppBar>
                <div ref={containerRef} className={classes.container}>
                    <div ref={pageContainerRef} style={{height: pageHeight, paddingTop: topBarHeight}}>
                        <CacheSwitch>
                            <CacheRoute exact path="/" component={TimelineFeedPage}/>
                            <Route exact path="/item/" render={() => <div>item page</div>}/>
                            <Route render={() => <div>404 Not Found</div>}/>
                        </CacheSwitch>
                    </div>
                    <GSBottomNavigation ref={bottomTabRef}/>
                </div>
            </Router>
        </AppContext.Provider>
    )
}

const useStyles = makeStyles({
    container: {
        height: '100%'
    }
});

export default Home