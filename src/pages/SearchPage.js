import React, {useContext, useEffect, useRef, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommonFeedItemView from "../component/feedCommomList/CommonFeedItemView";
import {AppContext} from "./Home";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {alpha, AppBar, Button, Fab, InputBase, Toolbar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {getRandomFeedItem, searchFeedItemByKeyword} from "../utils/http_util";
import {makeStyles} from "@material-ui/core/styles";
import ListItemPlaceholder from "../component/feedCommomList/ListItemPlaceholder";
import {getUserLoginInfo} from "../service/UserService";

function SearchPage() {

    const classes = useStyles();
    const [hasMore, setHasMore] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const searchBarRef = useRef(null)
    const [searchBarHeight, setSearchBarHeight] = useState(0)
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [preSearchKeyword, setPreSearchKeyword] = useState("")
    const [reqStart, setReqStart] = useState(0);
    const [visible, setVisible] = useState(false)
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        setSearchBarHeight(searchBarRef.current.clientHeight)
    }, [])

    const onSearchClick = () => {
        setLoading(true)
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
            setLoading(false)
        })
    }
    const toggleVisible = (event) => {
        const scrolled = event.target.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        document.getElementById("searchScrollableDiv").scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    const onInputTextChange = (event) => {
        setSearchKeyword(event.target.value)
    };

    const fetchData = (refresh, callback) => {
        if (refresh) {
            setDataSource([])
            setReqStart(0);
        }

        if (searchKeyword === "") {
            let userId = ""
            if (userInfo !== null) {
                userId = userInfo["uid"]
            }
            let randomParams = {
                start: reqStart,
                size: 10,
                userId: userId
            }

            getRandomFeedItem(randomParams).then((resp) => {
                if (resp.status === 200 && resp.data.data.length > 0) {
                    callback(resp.data.data);
                    setReqStart((prevState) => prevState + 10);
                }
            }).catch((error) => {
            })

            return
        }

        if (preSearchKeyword !== "" && preSearchKeyword !== searchKeyword) {
            setReqStart(0)
        }

        let params = {
            start: reqStart,
            size: 10,
            keyword: searchKeyword
        }
        setPreSearchKeyword(searchKeyword)
        searchFeedItemByKeyword(params).then((resp) => {
            if (resp.status === 200 && resp.data.data.length > 0) {
                callback(resp.data.data);
                setReqStart((prevState) => prevState + 10);
            }
        }).catch((error) => {

        })
    }

    const handleInfiniteOnLoad = () => {
        fetchData(false, res => {
            if (res === undefined || res === null || res === []) {
                setHasMore(false)
                return
            }
            let tempData = dataSource.concat(res);
            setDataSource(tempData)
        });
    };

    const onPullRefresh = () => {
        setLoading(true)
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
            setLoading(false)
        })
    }, [])

    const appContext = useContext(AppContext);

    return (
        <div>
            <AppBar ref={searchBarRef}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="输入关键字..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onChange={onInputTextChange}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={onSearchClick}>搜索</Button>
                </Toolbar>
            </AppBar>
            <ScrollToTop smooth color={"orange"} component={<KeyboardArrowUpIcon/>}/>
            <div id="searchScrollableDiv"
                 onScroll={toggleVisible}
                 style={{
                     height: (appContext.GetCPageHeight() - searchBarHeight),
                     marginTop: searchBarHeight,
                     overflowY: "scroll"
                 }}>
                {loading?(<PlaceholderItemList/>):
                    <InfiniteScroll
                        scrollableTarget={"searchScrollableDiv"}
                        dataLength={dataSource.length}
                        next={handleInfiniteOnLoad}
                        hasMore={hasMore}
                        endMessage={
                            <p style={{textAlign: 'center', color: 'grey'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        refreshFunction={onPullRefresh}
                        pullDownToRefresh={true}
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{textAlign: 'center', color: 'grey'}}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{textAlign: 'center', color: 'grey'}}>&#8593; Release to refresh</h3>
                        }
                    >
                        {dataSource.map((_, index) => (
                            <CommonFeedItemView key={index} data={dataSource[index]}/>
                        ))}
                    </InfiniteScroll>
                }
                <Fab color="primary" size="small" onClick={scrollToTop}
                     style={{position: "fixed", display: visible ? 'inline' : 'none',bottom: "80px", right: "60px", zIndex: 99}}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </div>
    )
}

function PlaceholderItemList() {

    return(
        <div>
            <ListItemPlaceholder/>
            <ListItemPlaceholder/>
            <ListItemPlaceholder/>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '80%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));
export default SearchPage