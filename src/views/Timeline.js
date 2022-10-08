import React from "react";
import CommonFeedList from "../component/CommonFeedList";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemByUserId, getLatestFeedItem } from "../utils/http_util";


function Timeline() {

  const userInfo = JSON.parse(getUserLoginInfo())

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
        if (resp.status === 200 && resp.data.data.length > 0) {
          callback(resp.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      getFeedItemByUserId(params).then((resp) => {
        if (resp.status === 200 && resp.data.data.length > 0) {
          callback(resp.data.data);
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <CommonFeedList fetchData={fetchData} />
  )
}


export default Timeline;
