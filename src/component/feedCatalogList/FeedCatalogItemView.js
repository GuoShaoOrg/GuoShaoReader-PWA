import React, {useEffect, useState} from "react";
import FeedCatalogHorizontalList from "./FeedCatalogHorizontalList";
import {
    Avatar,
    Card,
    CardActionArea, CardActions,
    CardHeader, IconButton,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import {getUserLoginInfo} from "../../service/UserService";
import Toast from "../Toast";
import {useHistory} from "react-router-dom";
import copy from 'copy-to-clipboard';

export default function FeedCatalogItemView(props) {
    const classes = useStyles();
    const itemData = props.data
    const [subTitle, setSubTitle] = useState(itemData.ChannelDesc);
    const userInfo = JSON.parse(getUserLoginInfo());
    const history = useHistory()

    const onFeedTitleClick = () => {
        history.push({
            pathname: '/feed/channel/'+itemData.Id
        })
    }

    useEffect(() => {
        if (subTitle.length > 50) {
            setSubTitle(itemData.ChannelDesc.substring(0, 30) + "...")
        }
    }, [])


    const handlerShareClick = () => {
        copy(itemData.Link)
        Toast.show("链接已复制到剪贴板", "info")
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="rss" className={classes.avatar} src={itemData.ImageUrl}/>
                    }
                    onClick={onFeedTitleClick}
                    title={itemData.Title}
                    subheader={subTitle}
                    className={classes.title}
                />
                {itemData.ItemList === null || itemData.ItemList.length === 0 ? null : (
                    <FeedCatalogHorizontalList data={itemData.ItemList}/>)
                }

            </CardActionArea>
            <CardActions disableSpacing>
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
    avatar: {
        backgroundColor: "transparent",
    },
}));