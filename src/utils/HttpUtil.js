import axios from "axios";
import Toast from "../component/Toast";
import { getAuthToken } from "../service/UserService";

let instance = axios.create();

instance.interceptors.request.use(function(config) {
  if (config.headers.Authorization === undefined
    || config.headers.Authorization === null
    || config.headers.Authorization === "") {
    config.headers.Authorization = getAuthToken();
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
  if (response.data.error !== 0) {
    Toast.show(response.data.msg, "error")
    return;
  }
  let respJsonString = JSON.stringify(response.data.data[0])
  return respJsonString;
}, function(error) {
  if (error.response.status === 401) {
    Toast.show("请先登录", "error");
    return;
  }
  return Promise.reject(error);
});

export default function getHttpInstance() {
  return instance;
}

export const register = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/user/register";
  return instance.post(api_url, data);
}

export const login = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/user/login";
  return instance.post(api_url, data);
}

export const subFeedChannelById = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/channel/sub/uid";
  return instance.post(api_url, data);
};

export const getFeedItemByUserId = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/item/by_uid";
  return instance.get(api_url, { params: data });
}

export const getLatestFeedItem = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/feed/latest";
  return instance.get(api_url, { params: data });
};

export const markFeedItemByUserId = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/feed/item/mark";
  return instance.post(api_url, data);
}

export const getFeedChannelCatalogListByUserId = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/feed/channel/catalogs/by_uid";
  return instance.get(api_url, { params: data });
}

export const searchFeedItemByKeyword = (data) => {
  let api_url = process.env.REACT_APP_BASE_API + "v1/api/feed/search";
  return instance.get(api_url, { params: data });
}

export const getFeedItemByChannelId = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/item/cid";
  return instance.get(api_url, { params: data });
}

export const getRandomFeedItem = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/random";
  return instance.get(api_url, { params: data });
}

export const getFeedChannelInfoById = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/channel/by_uid";
  return instance.get(api_url, { params: data });
}

export const getMarkedFeedItemListByUserId = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/item/mark";
  return instance.get(api_url, { params: data });
}

export const getFeedItemInfoById = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/item/id";
  return instance.get(api_url, { params: data });
}

export const getFeedTags = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/by_tag";
  return instance.get(api_url, { params: data });
}

export const getFeedChannelCatalogListByTag = (data) => {
  let api_url =
    process.env.REACT_APP_BASE_API + "v1/api/feed/channel/catalogs/by_tag";
  return instance.get(api_url, { params: data });
}
