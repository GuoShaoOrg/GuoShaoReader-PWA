import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import GSBottomNavigation from "../component/GSBottomNavigation";
import TimelineFeedPage from "./TimelineFeedPage";
import Setting from "../component/Setting";
import SubscriptionList from "../component/SubscriptionList";
import ExploreFeedView from "../component/ExploreFeedView";

export const AppContext = React.createContext(null);

function Home() {
    const classes = useStyles();
    const bottomTabRef = useRef(null)
    const containerRef = useRef(null)
    const pageContainerRef = useRef(null)
    const [pageHeight, setPageHeight] = useState(0)

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        token: action.token,
                    };
                default:
                    break
            }
        },
        {
            token: ""
        },
    );

    const authContext = {
        Login: (token) => {
            dispatch({type: "RESTORE_TOKEN", token: token});
        },
        LogOut: () => {

        },
        GetUserInfo: () => {

        },
        GetCPageHeight: () => {
            return pageHeight
        },
    };

    useEffect(() => {
        setPageHeight(containerRef.current.clientHeight - bottomTabRef.current.clientHeight)
    }, [state.token])


    return (
        <AppContext.Provider value={authContext}>
            <Router>
                <div ref={containerRef} className={classes.container}>
                    <div ref={pageContainerRef} style={{height: pageHeight}}>
                        <CacheSwitch>
                            <CacheRoute exact path="/" component={TimelineFeedPage}/>
                            <Route exact path="/subList/" component={SubscriptionList}/>
                            <Route exact path="/explore/" component={ExploreFeedView}/>
                            <Route exact path={"/setting"} component={Setting}/>
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