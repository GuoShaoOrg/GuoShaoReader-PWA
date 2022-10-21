import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserLoginInfo } from "../service/UserService";
import { getFeedItemInfoById, markFeedItemByUserId } from "../utils/HttpUtil";
import Toast from "../component/Toast";
import copy from "copy-to-clipboard";
import { Button, IconButton, Typography } from "@mui/material";
import parse from "html-react-parser";
import { FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";

function FeedItemDetail() {


  const { itemId } = useParams()
  const [author, setAuthor] = React.useState("")
  const [date, setDate] = React.useState("")
  const [itemHtml, setItemHtml] = React.useState("")
  const [thumbnail, setThumbnail] = React.useState("")
  const [isMarked, setIsMarked] = React.useState(false)
  const userInfo = getUserLoginInfo();
  const [itemData, setItemData] = React.useState({})

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
      itemId: itemId,
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
        setThumbnail(itemInfoData.Thumbnail)
        setTimeout(() => {
          optimizeImg()
        }, 500);
      }
    }).catch(err => {
      console.log(err)
    })
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


  return (
    <div className="w-full pl-5 mt-5 max-w-3xl m-auto">
      <img src={thumbnail} alt={""} style={{ width: "100%" }} />
      <div className="mr-4">
        <div onClick={toOriginalPage}>
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
        </div>

      </div>
    </div>
  )
}

export default FeedItemDetail;
