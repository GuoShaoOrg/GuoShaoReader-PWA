import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getFeedChannelInfoById, getFeedItemByChannelId, subFeedChannelById} from "../utils/http_util";
import {getUserLoginInfo} from "../service/UserService";
import {AuthContext} from "./Home";
import {
    Avatar, Box, Button,
    Card, CardContent, Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {orange} from "@material-ui/core/colors";
import CommonFeedListView from "../component/feedCommomList/CommonFeedListView";
import Toast from "../component/Toast";

const FeedChannelPage = () => {

    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const {channelId} = useParams()
    const [reqStart, setReqStart] = useState(0);
    const [channelInfo, setChannelInfo] = useState(0);
    const [isSub, setIsSub] = useState(false);
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
                if (res.status === 200) {
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
                    if (res.data.data.Sub === 1) {
                        setIsSub(true)
                    } else {
                        setIsSub(false)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const subFeedChannel = () => {
        let uid = "";
        if (userInfo !== null) {
            uid = userInfo["uid"]
        }
        let params = {
            UserId: uid,
            ChannelId: channelInfo.Id,
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
                    <Typography style={{textAlign: "center"}} variant="body2" color="textSecondary">
                        {channelInfo.ChannelDesc}
                    </Typography>
                    <Typography style={{textAlign: "center", color: "gray"}} variant="body2" color="textSecondary">
                        文章 {channelInfo.Count}
                    </Typography>
                    <Box style={{width: '100%'}}>
                        {isSub
                            ?
                            <Button onClick={subFeedChannel} className={classes.subBtn} variant="contained">
                                取消订阅
                            </Button>
                            :
                            <Button onClick={subFeedChannel} className={classes.subBtn} variant="contained" color="primary">
                                订阅
                            </Button>
                        }
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <div>
            <CommonFeedListView containerId={"FeedChannelPageCommonFeedListView"}
                                fetchData={getFeedItemList}
                                listHeader={<ListHeader/>}
                                style={{height: authContext.GetCPageHeight(), overflowY: "scroll"}}/>
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
    },
    subBtn: {
        display: "table",
        margin: '0 auto',
        marginTop: '10px',
    }

}));
export default FeedChannelPage;