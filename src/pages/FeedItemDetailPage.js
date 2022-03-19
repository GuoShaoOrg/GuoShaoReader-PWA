import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {getUserLoginInfo} from "../service/UserService";
import {
    getFeedItemInfoById, markFeedItemByUserId,
} from "../utils/http_util";
import {AuthContext} from "./Home";
import parse from "html-react-parser";
import {
    Button,
    Container, IconButton,
    Typography
} from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Toast from "../component/Toast";
import copy from "copy-to-clipboard";

const FeedItemDetailPage = () => {

    const classes = useStyles();

    const {itemId} = useParams()
    const history = useHistory()
    const authContext = useContext(AuthContext);
    const [author, setAuthor] = React.useState("")
    const [date, setDate] = React.useState("")
    const [itemHtml, setItemHtml] = React.useState("")
    const [thumbnail, setThumbnail] = React.useState("")
    const [isMarked, setIsMarked] = React.useState(false)
    const userInfo = JSON.parse(getUserLoginInfo());
    const [itemData, setItemData] = React.useState({})

    useEffect(() => {
        getItemInfo()
    }, [])


    const optimizeImg = () => {
        const img = document.querySelectorAll("img")
        img.forEach(item => {
            item.style.maxWidth = "100%"
            item.style.height = "auto"
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
                if (itemInfoData.Marked === 1) {
                    setIsMarked(true)
                }

                setDate(itemInfoData.InputDate.slice(0, 10))
                setItemHtml(itemInfoData.ChannelDesc)
                setThumbnail(itemInfoData.Thumbnail)
                setTimeout(() => {
                    optimizeImg()
                }, 500);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const toChannelPage = () => {
        history.push({
            pathname: '/feed/channel/'+itemData.ChannelId
        })
    }

    const toOriginalPage = () => {
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

    const handlerShareClick = () => {
        let shareItemLink = process.env.REACT_APP_BASE_API + "s/f/" + itemData.Id;
        let shareText = itemData.Title + "\n" + shareItemLink
        copy(shareText)
        Toast.show("链接已复制到剪贴板", "info")
    }

    return (
        <div style={{overflow: 'scroll', height: authContext.GetCPageHeight()}}>
            <img src={thumbnail} alt={""} style={{width: "100%"}}/>
            <Container>
                <div onClick={toOriginalPage}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {itemData.Title}
                    </Typography>
                </div>
                <div onClick={toChannelPage}>
                    <Typography variant="subtitle2" gutterBottom component="div" style={{"color": "#9e9e9e"}}>
                        {itemData.ChannelTitle}
                    </Typography>
                </div>
                <Typography variant="caption" display="block" gutterBottom style={{"color": "#9e9e9e"}}>
                    {date}&nbsp;&nbsp;{author}
                </Typography>
                <div className={classes.channelDescription}>
                    {parse(itemHtml)}
                </div>

            </Container>
            <div className={classes.shareDiv}>
                <IconButton aria-label="favorite" onClick={handlerFavoriteClick}>
                    {isMarked ? <FavoriteBorderOutlinedIcon color={"primary"}/> : (
                        <FavoriteBorderOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton aria-label="share" onClick={handlerShareClick}>
                    <ShareOutlinedIcon/>
                </IconButton>
                <Button color={"primary"} size="small" onClick={toOriginalPage}>查看原文</Button>
            </div>
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
    channelDescription: {
        overflow: "scroll",
        marginBottom: "50px"
    },
    shareDiv: {
        position: "fixed",
        bottom: "0px",
        width: "100%",
        backgroundColor: "#f5f5f5",
    }

}));

export default FeedItemDetailPage