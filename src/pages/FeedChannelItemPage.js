import React, {useState} from "react";
import {useParams} from "react-router-dom";
import CommonFeedListView from "../component/commomList/CommonFeedListView";
import {getFeedItemByChannelId} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";

const FeedChannelItemPage = () => {

    const {channelId} = useParams()
    const [reqStart, setReqStart] = useState(0);
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

    return(
        <div>
            <CommonFeedListView fetchData={getFeedItemList} />
        </div>
    )
}

export default FeedChannelItemPage;