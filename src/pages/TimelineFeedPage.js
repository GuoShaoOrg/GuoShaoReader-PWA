import React, {useContext, useState} from "react";
import CommonFeedListView from "../component/feedCommomList/CommonFeedListView";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemByUserId, getLatestFeedItem } from "../utils/http_util";
import {AuthContext} from "./Home";

function TimelineFeedPage() {
    const authContext = useContext(AuthContext);
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
                        callback(res.data.data);
                        setReqStart((prevState) => prevState + 10);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            getFeedItemByUserId(params)
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
    };

    return (
        <div>
            <CommonFeedListView containerId={"TimelineFeedPageCommonFeedListView"}
                                fetchData={fetchData}
                                style={{height: authContext.GetCPageHeight(), overflowY: "scroll", marginTop:5}} />
        </div>
    );
}

export default TimelineFeedPage;
