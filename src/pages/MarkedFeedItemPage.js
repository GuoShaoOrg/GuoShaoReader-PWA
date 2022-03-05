import React, {useContext, useState} from "react";
import {getMarkedFeedItemListByUserId} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";
import CommonFeedListView from "../component/feedCommomList/CommonFeedListView";
import {AuthContext} from "./Home";

const MarkedFeedItemPage = () => {

    const authContext = useContext(AuthContext);
    const [reqStart, setReqStart] = useState(0);
    const userInfo = JSON.parse(getUserLoginInfo());
    const getMarkedFeedItemList = (refresh, callback) => {
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
        getMarkedFeedItemListByUserId(params)
            .then((res) => {
                if (res.status === 200) {
                    callback(res.data.data)
                    setReqStart((prevState) => prevState + 10);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <CommonFeedListView containerId={"TimelineFeedPageCommonFeedListView"}
                                fetchData={getMarkedFeedItemList}
                                style={{height: authContext.GetCPageHeight(), overflowY: "scroll", marginTop: 5}} />
        </div>
    )
}

export default MarkedFeedItemPage;