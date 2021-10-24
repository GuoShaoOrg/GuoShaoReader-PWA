import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getFeedChannelInfoById, getFeedItemByChannelId} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";
import {AppContext} from "./Home";
import {
    Avatar, Box,
    Card, CardContent, Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {orange} from "@material-ui/core/colors";
import CommonFeedListView from "../component/feedCommomList/CommonFeedListView";

const FeedChannelPage = () => {

    const classes = useStyles();
    const appContext = useContext(AppContext);
    const {channelId} = useParams()
    const [reqStart, setReqStart] = useState(0);
    const [channelInfo, setChannelInfo] = useState(0);
    const userInfo = JSON.parse(getUserLoginInfo());

    const getFeedItemList = (refresh, callback) => {
        let userId = ""
        if (userInfo !== null) {
            userId = userInfo["uid"]
        }
        let params = {
            start: reqStart,
            size: 10,
            channelId: channelId,
            userId: userId
        }
        getFeedItemByChannelId(params)
            .then((res) => {
                if (res.status === 200 && res.data.data.length > 0) {
                    callback(res.data.data);
                    setReqStart((prevState) => prevState + 10);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getFeedChannelInfo = () => {
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

    useEffect(() => {
        getFeedChannelInfo()
    }, [])

    const ListHeader = () => {
        return (
            <Card className={classes.root}>
                <Box sx={{mx: 'auto', color: '#fff', width: 100, p: 1, m: 1, borderRadius: 1, textAlign: 'center',}}>
                    <Avatar alt="logo" src={channelInfo.ImageUrl} style={{width: 100, height: 100}}/>
                </Box>
                <CardContent>
                    <Typography style={{textAlign: "center"}} gutterBottom variant="h5" component="div">
                        {channelInfo.Title}
                    </Typography>
                    <Typography style={{textAlign: "center"}} variant="body2" color="text.secondary">
                        {channelInfo.ChannelDesc}
                    </Typography>
                    <Typography style={{textAlign: "center", color: "gray"}} variant="body2" color="text.secondary">
                        文章 {channelInfo.Count}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    return (
        <div>
            <CommonFeedListView containerId={"TimelineFeedPageCommonFeedListView"}
                                fetchData={getFeedItemList}
                                listHeader={<ListHeader/>}
                                style={{height: appContext.GetCPageHeight(), overflowY: "scroll"}}/>
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
        backgroundColor: orange[500],
    },
    dateText: {
        marginTop: "10px"
    },
    channelDescription: {
        maxHeight: "300px",
        overflow: "scroll"
    }

}));
export default FeedChannelPage;