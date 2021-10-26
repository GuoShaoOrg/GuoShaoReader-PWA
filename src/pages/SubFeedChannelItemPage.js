import React, {useState} from "react";
import FeedCatalogListView from "../component/feedCatalogList/FeedCatalogListView";
import {getFeedChannelCatalogListByUserId} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";

const SubFeedChannelItemPage = () => {

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
    return (
        <div>
            <FeedCatalogListView loadData={loadData}/>
        </div>
    )
}

export default SubFeedChannelItemPage