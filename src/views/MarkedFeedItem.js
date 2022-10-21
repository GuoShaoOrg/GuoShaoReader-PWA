import React from "react";
import CommonFeedList from "../component/CommonFeedList";
import { getUserLoginInfo } from "../service/UserService";
import { getMarkedFeedItemListByUserId } from "../utils/HttpUtil";

function MarkedFeedItem() {

  const userInfo = getUserLoginInfo();

  const fetchData = (refresh, page, callback) => {
    let params;
    let userId = ""
    if (userInfo !== null) {
      userId = userInfo["uid"]
    }

    if (refresh) {
      params = {
        start: 0,
        size: 10,
        userId: userId
      }
    } else {
      params = {
        start: (page - 1) * 10,
        size: 10,
        userId: userId
      }
    }

    getMarkedFeedItemListByUserId(params)
      .then((res) => {
        if (res !== null || res !== undefined) {
          let respJson = JSON.parse(res)
          callback(respJson)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CommonFeedList fetchData={fetchData} />
  )
}

export default MarkedFeedItem;
