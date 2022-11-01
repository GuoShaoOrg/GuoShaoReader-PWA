import { List, ListItem, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommonFeedListItem from "../component/CommonFeedListItem";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedChannelInfoById, getFeedItemByChannelId } from "../utils/HttpUtil";
import logo from "../assets/logo.png"
import { HomeContext } from "./Home";


function FeedChannelDetailPage() {

  const { channelId } = useParams()
  const homeContext = useContext(HomeContext)
  const [itemList, setItemList] = useState([])
  const [channelInfo, setChannelInfo] = useState({})
  const userInfo = getUserLoginInfo();

  useEffect(() => {
    getFeedChannelInfo(channelId)
    getFeedItemList(channelId)
  }, [])

  const getFeedChannelInfo = (channelId) => {
    let userId = ""
    if (userInfo !== null) {
      userId = userInfo["uid"]
    }
    let params = {
      channelId: channelId,
      userId: userId
    }
    getFeedChannelInfoById(params)
      .then((res) => {
        if (res !== null || res !== undefined || res !== "undefined") {
          let channelInfoData = JSON.parse(res)
          setChannelInfo(channelInfoData)
          homeContext.setBarTitle(channelInfoData.Title)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getFeedItemList = (channelId) => {
    let userId = ""
    if (userInfo !== null) {
      userId = userInfo["uid"]
    }
    let params = {
      start: 0,
      size: 10,
      channelId: channelId,
      userId: userId
    }
    getFeedItemByChannelId(params)
      .then((res) => {
        if (res !== null || res !== undefined) {
          let itemList = JSON.parse(res)
          setItemList(itemList)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="w-full mt-4">

        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-3xl border shadow-md ml-5 mr-5">
            <div className="w-full flex justify-center mt-4">
              {
                channelInfo.ImageUrl === "" || channelInfo.ImageUrl === null || channelInfo.ImageUrl === undefined ?
                  <img className="object-contain rounded-full border w-16 h-16 max-w-min" alt="icon" src={logo} />
                  :
                  <img className="object-contain rounded-full border w-16 h-16 max-w-min" alt="icon" src={channelInfo.ImageUrl} />
              }
            </div>
            <div className="mb-5">
              <Typography style={{ textAlign: "center" }} gutterBottom variant="h5" component="div">
                {channelInfo.Title}
              </Typography>
              <Typography style={{ textAlign: "center" }} variant="body2" color="textSecondary">
                {channelInfo.ChannelDesc}
              </Typography>
              <Typography style={{ textAlign: "center", color: "gray" }} variant="body2" color="textSecondary">
                文章 {channelInfo.Count}
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          < List sx={{ width: '100%', maxWidth: '710px' }} className="w-full place-self-center">
            {itemList.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ marginTop: "20px", justifyContent: "center" }}>
                <CommonFeedListItem data={item} />
              </ListItem>
            ))}
          </List>

        </div>
      </div>

    </div>
  )
}


export default FeedChannelDetailPage;
