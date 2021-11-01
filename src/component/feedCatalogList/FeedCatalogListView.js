import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {AppContext} from "../../pages/Home";
import FeedCatalogItemView from "./FeedCatalogItemView";
import {Fab} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListLoadingPlaceholder from "../feedCommomList/ListLoadingPlaceholder";

export default function FeedCatalogListView(props) {
    const appContext = useContext(AppContext);
    const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const loadData = props.loadData
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false)

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

    useEffect(() => {
        setLoading(true)
        loadData(true, resp => {
            setLoading(false)
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
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

    return(
        <div>
            <div id="feedCatalogScrollableDiv" onScroll={toggleVisible} style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}>
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
                     style={{position: "fixed", display: visible ? 'inline' : 'none',bottom: (appContext.GetBottomBarHeight() + 50), right: "60px", zIndex: 99}}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </div>
    )
}
