import React from "react";
import CommonFeedList from "../component/CommonFeedList";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemByUserId, getLatestFeedItem } from "../utils/HttpUtil";


function Timeline() {

  const userInfo = getUserLoginInfo()

  const fetchData = (refresh, page, callback) => {
    let params = {}
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


    if (userInfo === null || userInfo === undefined) {
      getLatestFeedItem(params).then((resp) => {
        let respJson = JSON.parse(resp)
        if (resp.length > 0) {
          callback(respJson);
        }
      }).catch((err) => {
        callback(null);
        console.log(err)
      })
    } else {
      getFeedItemByUserId(params).then((resp) => {
        let respJson = JSON.parse(resp)
        if (resp.length > 0) {
          callback(respJson);
        }
      }).catch((err) => {
        callback(null);
        console.log(err)
      })
    }
  }

  return (
    <CommonFeedList fetchData={fetchData} />
  )
}


export default Timeline;
