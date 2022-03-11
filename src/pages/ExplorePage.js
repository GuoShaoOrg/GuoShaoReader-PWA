import React, { useContext, useEffect, useState } from "react";
import { getFeedTags } from "../utils/http_util";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { AuthContext } from "./Home";
import { getFeedChannelCatalogListByTag } from "../utils/http_util";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ListLoadingPlaceholder from "../component/feedCommomList/ListLoadingPlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCatalogItemView from "../component/feedCatalogList/FeedCatalogItemView";
import { Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useCallbackState } from "../utils/state_callback";

function ExplorePage() {

    const classes = useStyles();
    const [tagList, setTagList] = useState([]);
    const [currentTagName, setCurrentTagName] = useCallbackState("");
    const authContext = useContext(AuthContext);
    const [reqStart, setReqStart] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false)
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        let params = {
            start: 0,
            size: 100
        }
        getFeedTags(params).then((res) => {
            if (res.status === 200) {
                setTagList(res.data.data);
                setCurrentTagName(res.data.data[0].name, function (tagName) {
                    refreshListData(tagName);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const handlerTagClick = (event, tagName) => {
        setCurrentTagName(tagName, function (tagName) {
            refreshListData(tagName);
        });
    }

    const loadData = (tagName, refresh, callback) => {
        let params;
        if (refresh) {
            setReqStart(0);
            params = {
                start: 0,
                size: 10,
                tagName: tagName
            };
        } else {
            params = {
                start: reqStart,
                size: 10,
                tagName: tagName
            };
        }
        getFeedChannelCatalogListByTag(params)
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

    const toggleVisible = (event) => {
        const scrolled = event.target.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const handleLoadMore = () => {
        loadData(currentTagName, false, res => {
            if (res === undefined || res === null || res === []) {
                console.log("no more data");
                setHasMore(false)
                return
            }
            let tempData = dataSource.concat(res);
            setDataSource(tempData)
        });
    };

    const onPullRefresh = () => {
        refreshListData(currentTagName)
    }

    const refreshListData = (tagName) => {
        setLoading(true)
        loadData(tagName, true, resp => {
            scrollToTop();
            setLoading(false)
            if (resp === undefined || resp === null || resp === []) {
                console.log("no more data");
                setHasMore(false)
                return
            }
            setDataSource(resp)
        })
    }

    const scrollToTop = () => {
        document.getElementById("explorePageScrollableDiv").scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    return (
        <div>
            <Box className={classes.tagListView}>
                <ScrollMenu >
                    {
                        tagList.map(item => {
                            return <Button className={classes.btnListItem} variant="contained" color="primary"
                                onClick={(e) => handlerTagClick(e, item.name)}>{item.name}
                            </Button>
                        })
                    }
                </ScrollMenu>
            </Box>
            <div id="explorePageScrollableDiv" onScroll={toggleVisible} style={{ height: (authContext.GetCPageHeight() - 55), overflowY: "scroll", marginTop: 5 }}>
                {loading ? (<ListLoadingPlaceholder />) :
                    <InfiniteScroll
                        scrollableTarget={"explorePageScrollableDiv"}
                        dataLength={dataSource.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        endMessage={
                            <p style={{ textAlign: 'center', color: 'grey' }}>
                                <b>没有更多了</b>
                            </p>
                        }
                        refreshFunction={onPullRefresh}
                        pullDownToRefresh={true}
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{ textAlign: 'center', color: 'grey' }}>&#8595; 下拉刷新</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: 'center', color: 'grey' }}>&#8593; 松开刷新</h3>
                        }
                    >
                        {dataSource.map((_, index) => (
                            <FeedCatalogItemView key={index} data={dataSource[index]} />
                        ))}
                    </InfiniteScroll>
                }
                <Fab color="primary" size="small" onClick={scrollToTop}
                    style={{ position: "fixed", display: visible ? 'inline' : 'none', bottom: (authContext.GetTopbarHeight() + 50), right: "60px", zIndex: 99 }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    tagListView: {
        height: 50,
    },
    btnListItem: {
        margin: 5,
        width: 120,
    }
}));

export default ExplorePage;