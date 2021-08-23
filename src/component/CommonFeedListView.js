import React, {useContext, useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommonFeedItemView from "./CommonFeedItemView";
import {AppContext} from "../pages/Home";

function CommonFeedListView(props) {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    const fetchData = props.fetchData

    const handleInfiniteOnLoad = () => {
        setLoading(true)
        fetchData(false, res => {
            if (res === undefined || res === null || res === []) {
                setHasMore(false)
                return
            }
            let tempData = dataSource.concat(res);
            setDataSource(tempData)
        });
        setLoading(false)
    };

    const onPullRefresh = () => {
        setLoading(true)
        fetchData(true, resp => {
            if (resp === undefined || resp === null || resp === []) {
                return
            }
            setDataSource(resp)
        })
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        fetchData(true, resp => {
            setDataSource(resp)
        })
        setLoading(false)
    }, [])

    const appContext = useContext(AppContext);

    return(
        <InfiniteScroll
            height={appContext.GetCPageHeight()}
            dataLength={dataSource.length}
            next={handleInfiniteOnLoad}
            hasMore={!loading && hasMore}
            loader={<h4 style={{textAlign: 'center',color:'grey'}}>Loading...</h4>}
            endMessage={
                <p style={{textAlign: 'center',color:'grey'}}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            refreshFunction={onPullRefresh}
            pullDownToRefresh={true}
            pullDownToRefreshThreshold={110}
            pullDownToRefreshContent={
                <h3 style={{textAlign: 'center',color:'grey'}}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
                <h3 style={{textAlign: 'center',color:'grey'}}>&#8593; Release to refresh</h3>
            }
        >
            {dataSource.map((_, index) => (
                <CommonFeedItemView key={index} data={dataSource[index]}/>
            ))}
        </InfiniteScroll>
    )
}

export default CommonFeedListView