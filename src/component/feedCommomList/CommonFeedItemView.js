import React, {useEffect} from "react";
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Toast from "../Toast";
import {markFeedItemByUserId} from "../../utils/http_util";
import {getUserLoginInfo} from "../../service/UserService";
import {useHistory} from "react-router-dom";
import copy from 'copy-to-clipboard';
import {diffTime} from "../../utils/time_utils";
import {getTextFromDescription} from "../../utils/common";

function CommonFeedItemView(props) {
    const classes = useStyles();

    const history = useHistory()
    const data = props.data
    const isTitleClickable = props.isTitleClickable
    const date = diffTime(data.InputDate, new Date())
    // const date = data.InputDate.slice(0, 10)
    const [author, setAuthor] = React.useState("")
    const [isMarked, setIsMarked] = React.useState(false)
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        if (data.Marked === 1) {
            setIsMarked(true)
        }
        if (data.Author !== "") {
            setAuthor("作者:" + data.Author)
        }
    }, [])

    const onFeedLinkClick = () => {
        history.push({
            pathname: '/feed/item/' + data.Id
        })
    }

    const onFeedTitleClick = () => {
        if (isTitleClickable !== undefined && isTitleClickable !== null && !isTitleClickable) {
            return
        }
        history.push({
            pathname: '/feed/channel/' + data.ChannelId
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
        let shareItemLink = process.env.REACT_APP_BASE_API + "s/f/" + data.Id;
        let shareText = data.Title + "\n" + shareItemLink
        copy(shareText)
        Toast.show("链接已复制到剪贴板", "info")
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar onClick={onFeedTitleClick} aria-label="rss" className={classes.avatar} src={data.ChannelImageUrl}/>
                    }
                    title={data.Title}
                    subheader={data.ChannelTitle}
                    className={classes.title}
                />
                <CardContent onClick={onFeedLinkClick}>
                    <meta name="referrer" content="no-referrer" />
                    {data.Thumbnail === ''
                        ?
                        <Typography className={classes.dateText} variant="subtitle1"
                                    color="textSecondary">{getTextFromDescription(data.Description)}</Typography>
                        :
                        <CardMedia
                            className={classes.channelDescription}
                            component="img"
                            image={data.Thumbnail}
                            alt=""
                        />}
                    <Typography className={classes.dateText} variant="subtitle2"
                                color="textSecondary">{date}&nbsp;&nbsp;{author}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
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