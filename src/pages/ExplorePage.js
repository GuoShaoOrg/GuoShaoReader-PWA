import React, {useState} from "react";
import FeedCatalogListView from "../component/feedCatalog/FeedCatalogListView";
import {getFeedChannelCatalogListByTag} from "../utils/http_util";

const ExplorePage = () => {

    const [reqStart, setReqStart] = useState(0);
    const loadData = (refresh, callback) => {
        let params;
        if (refresh) {
            setReqStart(0);
            params = {
                start: 0,
                size: 10,
                tagName: "科技"
            };
        } else {
            params = {
                start: reqStart,
                size: 10,
                tagName: "科技"
            };
        }
        getFeedChannelCatalogListByTag(params)
            .then((res) => {
                if (res.status === 200 && res.data.data.length > 0) {
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

export default ExplorePage