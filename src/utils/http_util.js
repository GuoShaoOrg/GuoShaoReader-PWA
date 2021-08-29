import axios from "axios";
import Toast from "../component/Toast";
import {getAuthToken} from "../service/UserService";

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
    if (response.status === 401) {
        Toast.show("请先登录", "error")
        return;
    }
    if (response.data.code !== 0) {
        Toast.show("发生了一些意外", "error")
        return;
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});


export default function getHttpInstance() {
    return instance;
}
