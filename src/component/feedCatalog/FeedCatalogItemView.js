import React, {useEffect, useState} from "react";
import FeedCatalogHorizontalList from "./FeedCatalogHorizontalList";
import {
    Avatar,
    Card,
    CardActionArea, CardActions,
    CardHeader, IconButton,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {orange} from "@material-ui/core/colors";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import {subFeedChannelById} from "../../utils/http_util";
import {getUserLoginInfo} from "../../service/UserService";
import Toast from "../Toast";
import {useHistory} from "react-router-dom";

export default function FeedCatalogItemView(props) {
    const classes = useStyles();
    const itemData = props.data
    const [subTitle, setSubTitle] = useState(itemData.ChannelDesc);
    const [isSub, setIsSub] = React.useState(false)
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
        if (itemData.Sub === 1) {
            setIsSub(true)
        }
    }, [])


    const handlerShareClick = () => {
        Toast.show("分享功能暂未开通", "info")
    }

    const handlerSubClick = () => {
        console.log(itemData)
        let params = {
            UserId: userInfo["uid"],
            ChannelId: itemData.Id,
        };

        subFeedChannelById(params).then(res => {
            if (res.status === 200) {
                setIsSub(true)
            }
        }).catch(err => {
            console.log(err)
        })
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
                {isSub ? null : (
                    <IconButton aria-label="follow" onClick={handlerSubClick}>
                        <PlaylistAddIcon/>
                    </IconButton>
                )}

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
        backgroundColor: orange[500],
    },
}));