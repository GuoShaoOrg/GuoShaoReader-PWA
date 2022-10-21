import React, { useContext, useEffect } from "react";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedChannelInfoById, getFeedItemByChannelId, getFeedItemInfoById, markFeedItemByUserId } from "../utils/HttpUtil";
import Toast from "../component/Toast";
import copy from "copy-to-clipboard";
import { Avatar, Button, Card, IconButton, List, ListItem, Typography } from "@mui/material";
import parse from "html-react-parser";
import { FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";
import { AppContext } from "../App";
import CommonFeedListItem from "./CommonFeedListItem";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function FeedItemDetail(props) {

  const appContext = useContext(AppContext)
  const showChannelInfo = props.showChannelInfo
  const [author, setAuthor] = React.useState("")
  const navigate = useNavigate()
  const [date, setDate] = React.useState("")
  const [itemHtml, setItemHtml] = React.useState("")
  const [thumbnail, setThumbnail] = React.useState("")
  const [isMarked, setIsMarked] = React.useState(false)
  const userInfo = getUserLoginInfo();
  const [itemData, setItemData] = React.useState({})
  const [itemList, setItemList] = React.useState([])
  const [channelInfo, setChannelInfo] = React.useState({})

  useEffect(() => {
    getItemInfo()
  }, [])

  const optimizeImg = () => {
    const img = document.querySelectorAll("img")
    img.forEach(item => {
      item.style.maxWidth = "100%"
      item.style.height = "auto"
      item.style.marginLeft = "auto"
      item.style.marginRight = "auto"
      item.style.marginTop = "10px"
      item.style.marginBottom = "10px"
    })
    const divs = document.querySelectorAll("div")
    divs.forEach(item => {
      if (item.style.width.replace("px", "") > window.innerWidth) {
        item.style.maxWidth = "100%"
        item.style.height = "auto"
      }
    })
  }

  const getItemInfo = () => {
    let uid = "";
    if (userInfo !== null) {
      uid = userInfo["uid"]
    }
    let params = {
      userId: uid,
      itemId: props.itemId,
    }

    getFeedItemInfoById(params).then(res => {
      if (res !== null || res !== undefined) {
        let itemInfoData = JSON.parse(res)
        setItemData(itemInfoData)
        if (itemInfoData.Author !== "") {
          setAuthor("作者:" + itemInfoData.Author)
        }
        if (itemInfoData.Marked === 1) {
          setIsMarked(true)
        }

        setDate(itemInfoData.InputDate.slice(0, 10))
        if (itemInfoData.Description === null || itemInfoData.Description === undefined || itemInfoData.Description === "") {
          setItemHtml(itemInfoData.Content)
        } else {
          setItemHtml(itemInfoData.Description)
        }

        if (showChannelInfo) {
          getFeedChannelInfo(itemInfoData.ChannelId)
          getFeedItemList(itemInfoData.ChannelId)
        }
        setThumbnail(itemInfoData.Thumbnail)
        setTimeout(() => {
          optimizeImg()
        }, 500);
      }
    }).catch(err => {
      console.log(err)
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

  const toOriginalPage = () => {
    window.open(itemData.Link)
  }

  const toChannelPage = () => {
  }

  const handlerFavoriteClick = () => {
    let params = {
      UserId: userInfo["uid"],
      ItemId: itemData.Id,
    };

    markFeedItemByUserId(params).then(res => {
      if (res === 1) {
        if (isMarked) {
          setIsMarked(false)
          Toast.show("取消收藏", "info")
        } else {
          setIsMarked(true)
          Toast.show("已收藏", "info")
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handlerShareClick = () => {
    let shareItemLink = process.env.REACT_APP_BASE_API + "s/f/" + itemData.Id;
    let shareText = itemData.Title + "\n" + shareItemLink
    copy(shareText)
    Toast.show("链接已复制到剪贴板", "info")
  }


  const toHomePage = () => {
    navigate("/")
  }


  return (
    <div className="w-full pl-4 pr-4 mt-5 max-w-3xl m-auto">
      <img src={thumbnail} alt={""} style={{ width: "100%" }} />
      <div>
        <div className="hover:cursor-pointer" onClick={toOriginalPage}>
          <Typography className="text-center" variant="h5" component="div" gutterBottom>
            {itemData.Title}
          </Typography>
        </div>
        <div onClick={toChannelPage}>
          <Typography variant="subtitle2" gutterBottom component="div" style={{ "color": "#9e9e9e" }}>
            {itemData.ChannelTitle}
          </Typography>
        </div>
        <Typography variant="caption" display="block" gutterBottom style={{ "color": "#9e9e9e" }}>
          {date}&nbsp;&nbsp;{author}
        </Typography>
        <div className="">
          {parse(itemHtml)}
        </div>
        {
          appContext.IsLogin() ?
            <div className="w-full bg-[#f5f5f5]">
              <IconButton aria-label="favorite" onClick={handlerFavoriteClick}>
                {isMarked ? <FavoriteBorderOutlined color={"primary"} /> : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <IconButton aria-label="share" onClick={handlerShareClick}>
                <ShareOutlined />
              </IconButton>
              <Button color={"primary"} size="small" onClick={toOriginalPage}>查看原文</Button>
            </div> : null
        }

      </div>
      {
        showChannelInfo ?
          <div>
            <div className="w-full flex justify-center mt-10">
              <Button variant="text" style={{ width: 300, color: orange[500] }} onClick={toHomePage}>点击到主页查看更多</Button>
            </div>

            <div className="w-full flex justify-center mt-4">
              <Card sx={{ width: "100%", maxWidth: "690px" }}>
                <div className="w-full flex justify-center">
                  <Avatar alt="logo" src={channelInfo.ImageUrl} style={{ width: 100, height: 100 }} />
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
              </Card>
            </div>

            <div className="w-full flex justify-center">
              < List sx={{ width: '100%' }} className="w-full place-self-center">
                {itemList.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ marginTop: "20px", justifyContent: "center" }}>
                    <CommonFeedListItem data={item} />
                  </ListItem>
                ))}
              </List>

            </div>
          </div> :
          null
      }
    </div >
  )
}

export default FeedItemDetail;
