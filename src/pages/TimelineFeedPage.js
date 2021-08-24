import React, {useState} from "react";
import CommonFeedListView from "../component/CommonFeedListView";
import getHttpInstance from "../utils/http_util";

function TimelineFeedPage() {

    const [reqStart, setReqStart] = useState(0);

    const fetchData = (refresh, callback) => {
        let api_url = process.env.REACT_APP_BASE_API + "rss/api/v1/feed/latest";
        let params
        if (refresh) {
            setReqStart(0)
            params = {
                start: 0,
                size: 10,

            };
        } else {
            params = {
                start: reqStart,
                size: 10,
            };
        }
        getHttpInstance().get(api_url, {
            params: params,
        })
            .then((response) => {
                callback(response.data.data)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setReqStart(prevState => (prevState + 10))
            });
    };

    return (
        <div>
            <CommonFeedListView fetchData={fetchData}/>
        </div>
    )
}

export default TimelineFeedPage