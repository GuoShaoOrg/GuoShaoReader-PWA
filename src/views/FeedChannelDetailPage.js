import { Button, Link, List, ListItem, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CommonFeedListItem from "../component/CommonFeedListItem";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedChannelInfoById, getFeedItemByChannelId } from "../utils/HttpUtil";
import logo from "../assets/logo.png"
import { HomeContext } from "./Home";
import { orange } from "@mui/material/colors";


function FeedChannelDetailPage() {

  const { channelId } = useParams()
  const homeContext = useContext(HomeContext)
  const history = useHistory()
  const [itemList, setItemList] = useState([])
  const [channelInfo, setChannelInfo] = useState({})
  const userInfo = getUserLoginInfo();

  useEffect(() => {
    getFeedChannelInfo(channelId)
    getFeedItemList(channelId)
  }, [])

  const toFeedItemListPage = () => {
    history.push({
      pathname: "/feed/channel/" + channelInfo.Id
    })
  }

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
          <div className="w-full max-w-2xl rounded-3xl border shadow-sm ml-5 mr-5">
            <div className="w-full flex justify-center mt-4 mb-4">
              {
                channelInfo.ImageUrl === "" || channelInfo.ImageUrl === null || channelInfo.ImageUrl === undefined ?
                  <img className="object-contain rounded-full border w-28 h-28" alt="icon" src={logo} />
                  :
                  <img className="object-contain rounded-full border w-28 h-28" alt="icon" src={channelInfo.ImageUrl} />
              }
            </div>
            <div className="mb-5">
              <div className=" w-full flex justify-center">
                <Link style={{ textAlign: "center" }} gutterBottom variant="h5" href={channelInfo.Link} target="_blank" underline="hover" color="black" rel="noreferrer">
                  {channelInfo.Title}
                </Link>
              </div>
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
      <div className="w-full flex justify-center mt-5 mb-5">
        <Button variant="text" style={{ width: 300, color: orange[500] }} onClick={toFeedItemListPage}>点查看更多</Button>
      </div>

    </div>
  )
}


export default FeedChannelDetailPage;
