import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommonFeedItemView from "./CommonFeedItemView";
import {AppContext} from "../../pages/Home";
import {Fab} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListItemPlaceholder from "./ListItemPlaceholder";
import ListLoadingPlaceholder from "./ListLoadingPlaceholder";

function CommonFeedListView(props) {

    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    const fetchData = props.fetchData

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
        document.getElementById("scrollableDiv").scrollTo({
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
                setHasMore(false)
                return
            }
            setDataSource(resp)
            setLoading(false)
        })
    }, [])

    const appContext = useContext(AppContext);

    return (
        <div id="scrollableDiv" onScroll={toggleVisible}
             style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}>
            {loading ? (<ListLoadingPlaceholder/>) :
                <InfiniteScroll
                    scrollableTarget={"scrollableDiv"}
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
    )
}

export default CommonFeedListView