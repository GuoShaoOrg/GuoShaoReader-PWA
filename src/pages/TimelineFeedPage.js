import React, { useState } from "react";
import CommonFeedListView from "../component/CommonFeedListView";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemByUserId, getLatestFeedItem } from "../utils/http_util";

function TimelineFeedPage() {
    const [reqStart, setReqStart] = useState(0);
    const userInfo = JSON.parse(getUserLoginInfo());

    const fetchData = (refresh, callback) => {
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
                userId: userId,
            };
        } else {
            params = {
                start: reqStart,
                size: 10,
                userId: userId,
            };
        }

        if (userInfo === null || userInfo === undefined) {
            getLatestFeedItem(params)
                .then((res) => {
                    if (res.status === 200) {
                        callback(res.data);
                        setReqStart((prevState) => prevState + 10);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            getFeedItemByUserId(params)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200 && res.data.data.length > 0) {
                        callback(res.data.data);
                        setReqStart((prevState) => prevState + 10);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <CommonFeedListView fetchData={fetchData} />
        </div>
    );
}

export default TimelineFeedPage;
