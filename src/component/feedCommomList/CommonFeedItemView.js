import React, {useEffect} from "react";
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import {orange} from '@material-ui/core/colors';
import parse from "html-react-parser";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Toast from "../Toast";
import {markFeedItemByUserId, subFeedChannelById} from "../../utils/http_util";
import {getUserLoginInfo} from "../../service/UserService";
import {useHistory} from "react-router-dom";
import copy from 'copy-to-clipboard';

function CommonFeedItemView(props) {
    const classes = useStyles();

    const history = useHistory()
    const data = props.data
    const date = data.InputDate.slice(0, 10)
    const [isSub, setIsSub] = React.useState(false)
    const [isMarked, setIsMarked] = React.useState(false)
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        if (data.Sub === 1) {
            setIsSub(true)
        }
        if (data.Marked === 1) {
            setIsMarked(true)
        }
    }, [])

    const onFeedLinkClick = () => {
        window.open(data.Link)
    }

    const onFeedTitleClick = () => {
        history.push({
            pathname: '/feed/channel/' + data.ChannelId
        })
    }

    const handlerFollowClick = () => {
        let uid = "";
        if (userInfo !== null) {
            uid = userInfo["uid"]
        }
        let params = {
            UserId: uid,
            ChannelId: data.ChannelId,
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

    const handlerFavoriteClick = () => {
        let params = {
            UserId: userInfo["uid"],
            ItemId: data.Id,
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
        copy(data.Link)
        Toast.show("链接已复制到剪贴板", "info")
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="rss" className={classes.avatar} src={data.ChannelImageUrl}/>
                    }
                    onClick={onFeedTitleClick}
                    title={data.Title}
                    subheader={data.ChannelTitle}
                    className={classes.title}
                />
                <CardContent onClick={onFeedLinkClick}>
                    <div className={classes.channelDescription}>
                        {parse(data.ChannelDesc)}
                    </div>
                    <Typography className={classes.dateText} variant="subtitle2"
                                color="textSecondary">{date}</Typography>
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


                <IconButton aria-label="share" onClick={handlerShareClick}>
                    <ShareOutlinedIcon/>
                </IconButton>
            </CardActions>
        </Card>
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

export default CommonFeedItemView