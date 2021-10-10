import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import GSBottomNavigation from "../component/GSBottomNavigation";
import TimelineFeedPage from "./TimelineFeedPage";
import SettingPage from "./SettingPage";
import SubFeedChannelItemPage from "./SubFeedChannelItemPage";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import GSBottomNavigationWithoutToken from "../component/GSBottomNavigationWithoutToken";
import {getAuthToken, getUserLoginInfo} from "../service/UserService";
import FeedChannelItemPage from "./FeedChannelItemPage";

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
            token: getAuthToken()
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
                            <CacheRoute exact path="/subList" component={SubFeedChannelItemPage}/>
                            <CacheRoute exact path="/explore" component={SearchPage}/>
                            <Route exact path={"/setting"} component={SettingPage}/>
                            <Route exact path={"/login"} component={LoginPage}/>
                            <Route exact path={"/feed/channel/:channelId"} component={FeedChannelItemPage}/>
                        </CacheSwitch>
                    </div>
                    {state.token === "" || state.token === undefined || state.token === null ?
                        (<GSBottomNavigationWithoutToken ref={bottomTabRef}/>) :
                        (<GSBottomNavigation ref={bottomTabRef}/>)}

                </div>
            </Router>
        </AppContext.Provider>
    )
}

const useStyles = makeStyles({
    container: {
        overflow: "hidden",
        height: '100%'
    }
});

export default Home