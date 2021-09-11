import axios from "axios";
import Toast from "../component/Toast";
import { getAuthToken } from "../service/UserService";

let instance = axios.create();

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization === undefined
        || config.headers.Authorization === null
        || config.headers.Authorization === "") {
        config.headers.Authorization = getAuthToken();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data.code !== 0) {
        Toast.show("发生了一些意外", "error")
        return;
    }
    return response;
}, function (error) {
    if (error.response.status === 401) {
        Toast.show("请先登录", "error");
        return;
    }
    return Promise.reject(error);
});

export default function getHttpInstance() {
    return instance;
}

export const subFeedChannelById = (data) => {
    let api_url =
        process.env.REACT_APP_BASE_API + "rss/api/v1/feed/sub_channel_by_user_id";
    return instance.post(api_url, data);
};

export const getFeedItemByUserId = (data) => {
    let api_url =
        process.env.REACT_APP_BASE_API + "rss/api/v1/feed/item_by_user_id";
    return instance.get(api_url, { params: data });
}

export const getLatestFeedItem = (data) => {
    let api_url = process.env.REACT_APP_BASE_API + "rss/api/v1/feed/latest";
    return instance.get(api_url, { params: data });
};

export const markFeedItemByUserId = (data) => {
    let api_url = process.env.REACT_APP_BASE_API + "rss/api/v1/feed/mark_feed_item_by_user_id";
    return instance.post(api_url, data);
}
