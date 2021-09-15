import React, {useContext, useEffect, useState} from "react";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import InfiniteScroll from "react-infinite-scroll-component";
import {AppContext} from "../../pages/Home";
import FeedCatalogItemView from "./FeedCatalogItemView";

export default function FeedCatalogListView(props) {
    const appContext = useContext(AppContext);
    const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const loadData = props.loadData

    useEffect(() => {
        loadData(true, resp => {
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
        loadData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
    }

    return(
        <div>
            <div id="feedCatalogScrollableDiv" style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}>
                <ScrollToTop smooth color={"orange"} component={<KeyboardArrowUpIcon/>}/>
                <InfiniteScroll
                    scrollableTarget={"feedCatalogScrollableDiv"}
                    dataLength={dataSource.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4 style={{textAlign: 'center', color: 'grey'}}>Loading...</h4>}
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
                        <FeedCatalogItemView key={index} data={dataSource[index]}/>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}