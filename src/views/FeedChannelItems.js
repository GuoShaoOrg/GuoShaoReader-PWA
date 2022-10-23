import React from "react";
import { useParams } from "react-router-dom";
import CommonFeedList from "../component/CommonFeedList";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemByChannelId } from "../utils/HttpUtil";
import { HomeContext } from "./Home";


function FeedChannelItems() {

  const userInfo = getUserLoginInfo()
  const { channelId } = useParams()
  const homeContext = React.useContext(HomeContext)

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
        channelId: channelId,
        userId: userId
      }
    } else {
      params = {
        start: (page - 1) * 10,
        size: 10,
        channelId: channelId,
        userId: userId
      }
    }


    if (userInfo !== null && userInfo !== undefined) {
      getFeedItemByChannelId(params).then((resp) => {
        let respJson = JSON.parse(resp)
        if (resp.length > 0) {
          let title = respJson[0].ChannelTitle
          homeContext.setBarTitle(title)
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


export default FeedChannelItems;
