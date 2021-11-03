import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommonFeedItemView from "./CommonFeedItemView";
import {Fab} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListLoadingPlaceholder from "./ListLoadingPlaceholder";
import {AppContext} from "../../pages/Home";

function CommonFeedListView(props) {

    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    const fetchData = props.fetchData
    const listHeader = props.listHeader
    const containerId = props.containerId
    const style = props.style

    const [visible, setVisible] = useState(false)

    const toggleVisible = (event) => {
        const scrolled = event.target.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };
    const scrollToTop = () => {
        document.getElementById(containerId).scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

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
                setLoading(false)
                setHasMore(false)
                return
            }
            setDataSource(resp)
            setLoading(false)
        })
    }, [])
    const appContext = useContext(AppContext);
    return (
        <div id={containerId} onScroll={toggleVisible} style={style}>
            <>{listHeader}</>
            {loading ? (<ListLoadingPlaceholder/>) :
                <InfiniteScroll
                    scrollableTarget={containerId}
                    dataLength={dataSource.length}
                    next={handleInfiniteOnLoad}
                    hasMore={hasMore}
                    endMessage={
                        <p style={{textAlign: 'center', color: 'grey'}}>
                            <b>没有更多了</b>
                        </p>
                    }
                    refreshFunction={onPullRefresh}
                    pullDownToRefresh={true}
                    pullDownToRefreshThreshold={150}
                    pullDownToRefreshContent={
                        <h3 style={{textAlign: 'center', color: 'grey'}}>&#8595; 下拉刷新</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{textAlign: 'center', color: 'grey'}}>&#8593; 松开刷新</h3>
                    }
                >
                    {dataSource.map((_, index) => (
                        <CommonFeedItemView key={index} data={dataSource[index]}/>
                    ))}
                </InfiniteScroll>
            }
            <Fab color="primary" size="small" onClick={scrollToTop}
                 style={{position: "fixed", display: visible ? 'inline' : 'none',bottom: (appContext.GetBottomBarHeight() + 50), right: "60px", zIndex: 99}}>
                <KeyboardArrowUpIcon />
            </Fab>
        </div>
    )
}

export default CommonFeedListView