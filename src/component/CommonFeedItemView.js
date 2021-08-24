import React from "react";
import {Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from '@material-ui/icons/Share';
import {orange} from '@material-ui/core/colors';
import parse from "html-react-parser";


function CommonFeedItemView(props) {
    const classes = useStyles();

    const data = props.data
    const date = data.InputDate.slice(0, 10)

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="rss" className={classes.avatar} src={data.ChannelImageUrl}/>
                    }
                    title={data.Title}
                    subheader={date}
                    className={classes.title}
                />
                <CardContent>
                    {parse(data.ChannelDesc)}
                </CardContent>

            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
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