import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CommonFeedListView from "../component/feedCommomList/CommonFeedListView";
import {getFeedChannelInfoById, getFeedItemByChannelId} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";
import {AppContext} from "./Home";

const FeedChannelPage = () => {

    const appContext = useContext(AppContext);
    const {channelId} = useParams()
    const [reqStart, setReqStart] = useState(0);
    const [channelInfo, setChannelInfo] = useState(0);
    const userInfo = JSON.parse(getUserLoginInfo());

    const getFeedItemList = (refresh, callback) => {
        let userId = ""
        if (userInfo !== null) {
            userId = userInfo["uid"]
        }
        let params = {
            start: reqStart,
            size: 10,
            channelId: channelId,
            userId: userId
        }
        getFeedItemByChannelId(params)
            .then((res) => {
                if (res.status === 200 && res.data.data.length > 0) {
                    callback(res.data.data);
                    setReqStart((prevState) => prevState + 10);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getFeedChannelInfo = () => {
        let userId = ""
        if (userInfo !== null) {
            userId = userInfo["uid"]
        }
        let params = {
            channelId: channelId,
            userId: userId
        }
        getFeedChannelInfoById(params)
            .then((res) => {
                if (res.status === 200 && res.data.data.length > 0) {
                    setChannelInfo(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getFeedChannelInfo()
    }, [])

    return (
        <div>
            <CommonFeedListView containerId={"FeedChannelPageCommonFeedListView"}
                                fetchData={getFeedItemList}
                                style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}
            />
        </div>
    )
}

export default FeedChannelPage;