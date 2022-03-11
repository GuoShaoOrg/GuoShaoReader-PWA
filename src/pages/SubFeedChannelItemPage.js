import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {AuthContext} from "./Home";
import FeedCatalogItemView from "../component/feedCatalogList/FeedCatalogItemView";
import {Fab} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListLoadingPlaceholder from "../component/feedCommomList/ListLoadingPlaceholder";
import { getFeedChannelCatalogListByUserId } from "../utils/http_util";
import { getUserLoginInfo } from "../service/UserService";

export default function SubFeedChannelItemPage() {
    const authContext = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false)

    const userInfo = JSON.parse(getUserLoginInfo());
    const [reqStart, setReqStart] = useState(0);
    const loadData = (refresh, callback) => {
        let params;
        let userId = ""
        if (userInfo !== null) {
            userId = userInfo["uid"]
        }
        if (refresh) {
            setReqStart(0);
            params = {
                start: 0,
                size: 10,
                userId: userId
            };
        } else {
            params = {
                start: reqStart,
                size: 10,
                userId: userId
            };
        }
        getFeedChannelCatalogListByUserId(params)
            .then((res) => {
                if (res.status === 200) {
                    callback(res.data.data);
                    setReqStart((prevState) => prevState + 10);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const scrollToTop = () => {
        document.getElementById("feedCatalogScrollableDiv").scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    const toggleVisible = (event) => {
        const scrolled = event.target.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const refreshListData = () => {
        setLoading(true)
        loadData(true, resp => {
            setLoading(false)
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
    }

    useEffect(() => {
        refreshListData()
    }, [])

    const handleLoadMore = () => {
        loadData(false, res => {
            if (res === undefined || res === null || res === []) {
                setHasMore(false)
                return
            }
            let tempData = dataSource.concat(res);
            setDataSource(tempData)
        });
    };

    const onPullRefresh = () => {
        refreshListData()
    }

    return(
        <div>
            <div id="feedCatalogScrollableDiv" onScroll={toggleVisible} style={{ height: authContext.GetCPageHeight(), overflowY: "scroll", marginTop: 5}}>
                {loading?(<ListLoadingPlaceholder/>):
                    <InfiniteScroll
                        scrollableTarget={"feedCatalogScrollableDiv"}
                        dataLength={dataSource.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        endMessage={
                            <p style={{textAlign: 'center', color: 'grey'}}>
                                <b>没有更多了</b>
                            </p>
                        }
                        refreshFunction={onPullRefresh}
                        pullDownToRefresh={true}
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{textAlign: 'center', color: 'grey'}}>&#8595; 下拉刷新</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{textAlign: 'center', color: 'grey'}}>&#8593; 松开刷新</h3>
                        }
                    >
                        {dataSource.map((_, index) => (
                            <FeedCatalogItemView key={index} data={dataSource[index]}/>
                        ))}
                    </InfiniteScroll>
                }
                <Fab color="primary" size="small" onClick={scrollToTop}
                    style={{ position: "fixed", display: visible ? 'inline' : 'none', bottom: (authContext.GetTopbarHeight() + 50), right: "60px", zIndex: 99}}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </div>
    )
}
