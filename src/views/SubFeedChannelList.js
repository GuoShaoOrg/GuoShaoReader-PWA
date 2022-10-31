import { Box, Divider, List, ListItem, ListItemAvatar, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import EmptyView from "../component/EmptyView";
import ListLoadingPlaceholder from "../component/ListPlacHolder";
import { getUserLoginInfo } from "../service/UserService";
import { getSubFeedChannelListByUserId } from "../utils/HttpUtil";
import logo from "../assets/logo.png"


function FeedChannelItem(props) {

  const feedChannelData = props.data
  const history = useHistory()
  const clickToChannelPage = () => {
    history.push({
      pathname: "/feed/channel/" + feedChannelData.Id
    })
  }

  return (
    <div className="w-full flex justify-start border rounded-md mr-5 ml-5">
      <div className="w-full flex justify-start">
        <ListItemAvatar className="ml-5 mr-5 mt-5 w-20 h-20 max-w-min flex justify-center hover:cursor-pointer">
          {
            feedChannelData.ImageUrl === "" || feedChannelData.ImageUrl === null || feedChannelData.ImageUrl === undefined ?
              <img onClick={clickToChannelPage} className="object-contain rounded-full border w-16 h-16 max-w-min" alt="icon" src={logo} />
              :
              <img onClick={clickToChannelPage} className="object-contain rounded-full border w-16 h-16 max-w-min" alt="icon" src={feedChannelData.ImageUrl} />
          }
        </ListItemAvatar>
        <div className="w-full mt-5 mb-5 mr-5">
          <div onClick={clickToChannelPage} className="text-lg font-bold hover:cursor-pointer">{feedChannelData.Title}</div>
          <div className="text-sm font-normal mt-2">{feedChannelData.ChannelDesc}</div>
          <div className="text-sm font-light">文章数: {feedChannelData.Count}</div>
          <a href={feedChannelData.Link} target="_blank" className="text-sm font-light">链接: {feedChannelData.Link}</a>
          <Divider sx={{ marginTop: "1.25rem" }} />
        </div>
      </div>
    </div>
  )
}


function SubFeedChannelList() {

  const userInfo = getUserLoginInfo()
  const [feedChannelList, setFeedChannelList] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState(0)
  const [subFeedListEmpty, setSubFeedListEmpty] = React.useState(true)


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


    if (userInfo !== null && userInfo !== undefined) {
      getSubFeedChannelListByUserId(params).then((resp) => {
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


  const updateFeedChannelList = (page, refresh) => {
    setPage(page)
    setLoading(true)
    fetchData(refresh, page, (resp) => {
      if (resp === undefined || resp === null || resp === []) {
        if (feedChannelList.length === 0) {
          setSubFeedListEmpty(true)
        }
        setLoading(false)
        return
      }
      setSubFeedListEmpty(false)
      setFeedChannelList(resp)
      setCount(resp[0].TotalFeedCount / resp.length)
    }, [])
    setLoading(false)
  }

  const handlePaginationChange = (_event, value) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    updateFeedChannelList(value, false)
  }

  useEffect(() => {
    updateFeedChannelList(1, true)
  }, [])

  return (
    <div className="w-full">
      {subFeedListEmpty ? (<EmptyView />) :
        <div>
          <Box className="flex justify-center">
            {loading ? (<ListLoadingPlaceholder />) :
              <List sx={{ width: '100%', maxWidth: 720 }} className="w-full">
                {feedChannelList.map((item, index) => (
                  <ListItem key={index} disablePadding className="mt-4">
                    <FeedChannelItem data={item} />
                  </ListItem>
                ))}
              </List>}
          </Box>
          <Box display="flex" justifyContent="center">
            <Pagination className="place-self-center mb-5" count={count} page={page} color="primary" onChange={handlePaginationChange} />
          </Box>
        </div>
      }
    </div>

  )
}


export default SubFeedChannelList;
