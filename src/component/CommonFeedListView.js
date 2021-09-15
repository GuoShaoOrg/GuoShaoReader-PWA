import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommonFeedItemView from "./CommonFeedItemView";
import {AppContext} from "../pages/Home";
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function CommonFeedListView(props) {

    const [hasMore, setHasMore] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    const fetchData = props.fetchData

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
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
    }

    useEffect(() => {
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
    }, [])

    const appContext = useContext(AppContext);

    return (
        <div id="scrollableDiv" style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}>
            <ScrollToTop smooth color={"orange"} component={<KeyboardArrowUpIcon/>}/>
            <InfiniteScroll
                scrollableTarget={"scrollableDiv"}
                dataLength={dataSource.length}
                next={handleInfiniteOnLoad}
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
                    <CommonFeedItemView key={index} data={dataSource[index]}/>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default CommonFeedListView