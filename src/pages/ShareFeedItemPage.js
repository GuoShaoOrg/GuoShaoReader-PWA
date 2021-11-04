import React, {useContext, useEffect, useState} from "react";
import {
    Avatar,
    Box, Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from "@material-ui/core";
import parse from "html-react-parser";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {getUserLoginInfo} from "../service/UserService";
import {
    getFeedChannelInfoById, getFeedItemByChannelId,
    getFeedItemInfoById,
    markFeedItemByUserId,
    subFeedChannelById
} from "../utils/http_util";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Toast from "../component/Toast";
import {orange} from "@material-ui/core/colors";
import CommonFeedItemView from "../component/feedCommomList/CommonFeedItemView";
import {AuthContext} from "./Home";

const ShareFeedItemPage = () => {

    const classes = useStyles();
    const history = useHistory()

    const {itemId} = useParams()
    const authContext = useContext(AuthContext);
    const [author, setAuthor] = React.useState("")
    const [date, setDate] = React.useState("")
    const [itemHtml, setItemHtml] = React.useState("")
    const [isSub, setIsSub] = React.useState(false)
    const [isMarked, setIsMarked] = React.useState(false)
    const [itemData, setItemData] = React.useState({})
    const [channelInfo, setChannelInfo] = useState({});
    const [itemList, setItemList] = useState([]);
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        getItemInfo()
    }, [])

    const getItemInfo = () => {
        let uid = "";
        if (userInfo !== null) {
            uid = userInfo["uid"]
        }
        let params = {
            UserId: uid,
            itemId: itemId,
        }

        getFeedItemInfoById(params).then(res => {
            if (res.status === 200) {
                let itemInfoData = res.data.data
                setItemData(itemInfoData)
                if (itemInfoData.Sub === 1) {
                    setIsSub(true)
                }
                if (itemInfoData.Marked === 1) {
                    setIsMarked(true)
                }
                if (itemInfoData.Author !== "") {
                    setAuthor("作者:" + itemInfoData.Author)
                }

                setDate(itemInfoData.InputDate.slice(0, 10))
                setItemHtml(itemInfoData.ChannelDesc)
                console.log(itemInfoData)
                getFeedChannelInfo(itemInfoData.ChannelId)
                getFeedItemList(itemInfoData.ChannelId)
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
                if (res.status === 200) {
                    setChannelInfo(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handlerFollowClick = () => {
        let uid = "";
        if (userInfo !== null) {
            uid = userInfo["uid"]
        }
        let params = {
            UserId: uid,
            ChannelId: itemData.ChannelId,
        };

        subFeedChannelById(params).then(res => {
            if (res.status === 200) {
                if (isSub) {
                    setIsSub(false)
                    Toast.show("取消订阅", "info")
                } else {
                    setIsSub(true)
                    Toast.show("订阅成功", "info")
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const onFeedLinkClick = () => {
        window.open(itemData.Link)
    }

    const handlerFavoriteClick = () => {
        let params = {
            UserId: userInfo["uid"],
            ItemId: itemData.Id,
        };

        markFeedItemByUserId(params).then(res => {
            if (res.status === 200) {
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
                if (res.status === 200) {
                    setItemList(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const toHomePage = () => {
        history.push({
            pathname: '/'
        })
    }

    return (
        <div style={{overflow: 'scroll',height: authContext.GetCPageHeight()}}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="rss" className={classes.avatar} src={itemData.ChannelImageUrl}/>
                        }

                        title={itemData.Title}
                        subheader={itemData.ChannelTitle}
                        className={classes.title}
                    />
                    <CardContent onClick={onFeedLinkClick}>
                        <div className={classes.channelDescription}>
                            {parse(itemHtml)}
                        </div>
                        <Typography className={classes.dateText} variant="subtitle2"
                                    color="textSecondary">{date}&nbsp;&nbsp;{author}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    {isSub ? <IconButton aria-label="follow" onClick={handlerFollowClick}>
                        <PlaylistAddIcon color={"primary"}/>
                    </IconButton> : (
                        <IconButton aria-label="follow" onClick={handlerFollowClick}>
                            <PlaylistAddIcon/>
                        </IconButton>
                    )}

                    <IconButton aria-label="favorite" onClick={handlerFavoriteClick}>
                        {isMarked ? <FavoriteBorderOutlinedIcon color={"primary"}/> : (
                            <FavoriteBorderOutlinedIcon/>
                        )}
                    </IconButton>
                </CardActions>
            </Card>

            <Box sx={{mx: 'auto', color: '#fff', width: 300, p: 1, m: 1, borderRadius: 1, textAlign: 'center',}}>
                <Button variant="text" style={{width: 300, color: orange[500]}} onClick={toHomePage}>点击到主页查看更多</Button>
            </Box>

            <Card className={classes.root}>
                <Box sx={{mx: 'auto', color: '#fff', width: 100, p: 1, m: 1, borderRadius: 1, textAlign: 'center',}}>
                    <Avatar alt="logo" src={channelInfo.ImageUrl} style={{width: 100, height: 100}}/>
                </Box>
                <CardContent>
                    <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="div">
                        {channelInfo.Title}
                    </Typography>
                    <Typography style={{textAlign: "center"}} variant="body2" color="textSecondary">
                        {channelInfo.ChannelDesc}
                    </Typography>
                    <Typography style={{textAlign: "center", color: "gray"}} variant="body2" color="textSecondary">
                        文章 {channelInfo.Count}
                    </Typography>
                </CardContent>
            </Card>

            {itemList.map((_, index) => (
                <CommonFeedItemView key={index} isTitleClickable={false} data={itemList[index]}/>
            ))}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '94%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '8px'
    },
    title: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: "transparent",
    },
    dateText: {
        marginTop: "10px"
    },
    channelDescription: {
        maxHeight: "300px",
        overflow: "scroll"
    }

}));

export default ShareFeedItemPage