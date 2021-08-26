import React from "react";
import {Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import {orange} from '@material-ui/core/colors';
import parse from "html-react-parser";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Toast from "./Toast";

function CommonFeedItemView(props) {
    const classes = useStyles();

    const data = props.data
    const date = data.InputDate.slice(0, 10)

    const onFeedLinkClick = () => {
        window.open(data.Link)
    }

    const onFeedTitleClick = () => {
        console.log("onFeedTitleClick")
    }

    const handlerFollowClick = () => {
        Toast.show("Handler Follow Click","info")
    }

    return (
        <Card className={classes.root}>
            <CardActionArea >
                <CardHeader
                    avatar={
                        <Avatar aria-label="rss" className={classes.avatar} src={data.ChannelImageUrl}/>
                    }
                    onClick={onFeedTitleClick}
                    title={data.Title}
                    subheader={date}
                    className={classes.title}
                />
                <CardContent onClick={onFeedLinkClick}>
                    {parse(data.ChannelDesc)}
                </CardContent>

            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="follow" onClick={handlerFollowClick}>
                    <PlaylistAddIcon/>
                </IconButton>
                <IconButton aria-label="favorite">
                    <FavoriteBorderOutlinedIcon/>
                </IconButton>
                <IconButton aria-label="share">
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
}));

export default CommonFeedItemView