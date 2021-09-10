import React from "react";
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
import Toast from "./Toast";
import { subFeedChannelById } from "../utils/http_util";
import { getUserLoginInfo } from "../service/UserService";

function CommonFeedItemView(props) {
    const classes = useStyles();

    const data = props.data
    const date = data.InputDate.slice(0, 10)
    const [isSub, setIsSub] = React.useState(false)
    const userInfo = JSON.parse(getUserLoginInfo());

    const onFeedLinkClick = () => {
        window.open(data.Link)
    }

    const onFeedTitleClick = () => {
        console.log("onFeedTitleClick")
    }

    const handlerFollowClick = () => {
        let params = {
          UserId: userInfo["uid"],
          ChannelId: data.ChannelId,
        };

        subFeedChannelById(params).then(res => {
            if (res.status === 200) {
                setIsSub(true)
            }
        }
        ).catch(err => {
            console.log(err)
        })
    }

    const handlerFavoriteClick = () => {
        Toast.show("Handler Favorite Click", "info")
    }

    const handlerShareClick = () => {
        Toast.show("Handler Share Click", "info")
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
                    {parse(data.ChannelDesc)}
                    <Typography className={classes.dateText} variant="subtitle2" color="textSecondary">{date}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
          {isSub ? null : (
            <IconButton aria-label="follow" onClick={handlerFollowClick}>
              <PlaylistAddIcon />
            </IconButton>
          )}

          <IconButton aria-label="favorite" onClick={handlerFavoriteClick}>
                    <FavoriteBorderOutlinedIcon/>
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
        backgroundColor: orange[500],
    },
    dateText: {
        marginTop: "10px"
    }
}));

export default CommonFeedItemView