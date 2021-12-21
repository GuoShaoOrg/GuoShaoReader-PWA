import React, {useContext, useEffect, useState} from "react";
import {
    Avatar,
    Box, Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography
} from "@material-ui/core";
import parse from "html-react-parser";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {getUserLoginInfo} from "../service/UserService";
import {
    getFeedChannelInfoById, getFeedItemByChannelId,
    getFeedItemInfoById,
} from "../utils/http_util";
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
    const [itemData, setItemData] = React.useState({})
    const [channelInfo, setChannelInfo] = useState({});
    const [itemList, setItemList] = useState([]);
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        getItemInfo()
    }, [])

    const optimizeImg = () => {
        const img = document.querySelectorAll("*")
        img.forEach(item => {
            if (item.width > window.innerWidth) {
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
            UserId: uid,
            itemId: itemId,
        }

        getFeedItemInfoById(params).then(res => {
            if (res.status === 200) {
                let itemInfoData = res.data.data
                setItemData(itemInfoData)
                if (itemInfoData.Author !== "") {
                    setAuthor("作者:" + itemInfoData.Author)
                }

                setDate(itemInfoData.InputDate.slice(0, 10))
                setItemHtml(itemInfoData.ChannelDesc)
                console.log(itemInfoData)
                getFeedChannelInfo(itemInfoData.ChannelId)
                getFeedItemList(itemInfoData.ChannelId)
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
                if (res.status === 200) {
                    setChannelInfo(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onFeedLinkClick = () => {
        window.open(itemData.Link)
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
        overflow: "scroll"
    }

}));

export default ShareFeedItemPage