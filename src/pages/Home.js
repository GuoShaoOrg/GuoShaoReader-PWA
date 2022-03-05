import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import TimelineFeedPage from "./TimelineFeedPage";
import SettingPage from "./SettingPage";
import SubFeedChannelItemPage from "./SubFeedChannelItemPage";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import { getAuthToken, storeUserLoginInfo } from "../service/UserService";
import FeedChannelPage from "./FeedChannelPage";
import MarkedFeedItemPage from "./MarkedFeedItemPage";
import AccountPage from "./AccountPage";
import RegisterPage from "./RegisterPage";
import ShareFeedItemPage from "./ShareFeedItemPage";
import FeedItemDetailPage from "./FeedItemDetailPage";
import GSTopDrawer from "../component/GSTopDrawer";

export const AuthContext = React.createContext(null);

function Home() {
    const classes = useStyles();
    const topbarRef = useRef(null)
    const containerRef = useRef(null)
    const pageContainerRef = useRef(null)
    const [pageHeight, setPageHeight] = useState(0)
    const [pageWidth, setPageWidth] = useState(0)
    const [topbarHeight, setTopbarHeight] = useState(0)

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
        IsLogin: () => {
            return state.token !== null || state.token !== undefined || state.token !== '';
        },
        Login: (token) => {
            dispatch({ type: "RESTORE_TOKEN", token: token });
        },
        LogOut: () => {
            dispatch({ type: "RESTORE_TOKEN", token: "" });
            storeUserLoginInfo(null);
        },
        GetUserInfo: () => {

        },
        GetCPageHeight: () => {
            return pageHeight
        },
        GetCPageWidth: () => {
            return pageWidth
        },
        GetTopbarHeight: () => {
            return topbarHeight
        },
    };

    useEffect(() => {
        setPageHeight(containerRef.current.clientHeight - topbarRef.current.clientHeight)
        setPageWidth(containerRef.current.clientWidth)
        setTopbarHeight(topbarRef.current.clientHeight)
    }, [state.token])


    return (
        <AuthContext.Provider value={authContext}>
            <Router>
                <div ref={containerRef} className={classes.container}>
                    <GSTopDrawer ref={topbarRef} />
                    <div ref={pageContainerRef} style={{ height: pageHeight }}>
                        <CacheSwitch>
                            <Route exact path="/">
                                <Redirect to="/timeline" />
                            </Route>
                            <CacheRoute exact path="/timeline" component={TimelineFeedPage} />
                            <CacheRoute exact path="/subList" component={SubFeedChannelItemPage} />
                            <CacheRoute exact path="/explore" component={SearchPage} />
                            <Route exact path={"/setting"} component={SettingPage} />
                            <Route exact path={"/login"} component={LoginPage} />
                            <Route exact path={"/register"} component={RegisterPage} />
                            <Route exact path={"/feed/channel/:channelId"} component={FeedChannelPage} />
                            <Route exact path={"/user/marked/item/"} component={MarkedFeedItemPage} />
                            <Route exact path={"/account/info"} component={AccountPage} />
                            <Route path={"/s/f/:itemId"} component={ShareFeedItemPage} />
                            <Route path={"/feed/item/:itemId"} component={FeedItemDetailPage} />
                        </CacheSwitch>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

const useStyles = makeStyles({
    container: {
        overflow: "hidden",
        height: '100%'
    }
});

export default Home